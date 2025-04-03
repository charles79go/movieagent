public without sharing class MovieDetailsAction {

    @InvocableMethod(
        label='Get movie details id'
        description='Get movie details using movie id'
    )
    public static List<String> getMovieDetails(
        List<Integer> movieId
    ) {
        String responseBody = '';
        List<String> responseFinal = new List<String>();
        String apiKey = System.Label.tmdbApiKey;

        Integer inputId = movieId[0];

        try {

            String movieDetailUrl = 'https://api.themoviedb.org/3/movie/' + inputId + '?api_key=' + apiKey + 
                                    '&language=en-US&append_to_response=release_dates,casts';
            // second request for movie details
            HttpRequest movieDetailRequest = new HttpRequest();
            movieDetailRequest.setEndpoint(movieDetailUrl);
            movieDetailRequest.setMethod('GET');

            // Send the request and receive the response
            Http http = new Http();

            HttpResponse movieDetailRes = http.send(movieDetailRequest);

            // Handle the response
            if (movieDetailRes.getStatusCode() == 200 || movieDetailRes.getStatusCode() == 201) {
                // Process the response, e.g., parse the JSON response
                responseBody = movieDetailRes.getBody();
            } else {
                System.debug('Error: ' + movieDetailRes.getStatus());
                responseBody = 'error';
            }

            MovieResultObj movieDetail = (MovieResultObj) JSON.deserialize(responseBody, MovieResultObj.class);

            // get the cast 
            List<Map<String,String>> castRawObjList = movieDetail.casts.get('cast');
            List<CastObj> castObjList = new List<CastObj>();

            Integer counter = 0; 
            for (Map<String,String> rawCastObj : castRawObjList) {
                String str = JSON.serialize(rawCastObj);
                CastObj castObject = (CastObj) JSON.deserialize(str, CastObj.class);

                castObject.hyperlinkName = createHyperlink(castObject.id, castObject.name, 'people');

                castObjList.add(castObject);

                counter++;
                if(counter == 15) break;
            }

            // get crew
            List<Map<String,String>> crewRawObjList = movieDetail.casts.get('crew');
            List<CrewObj> crewObjList = new List<CrewObj>();

            for (Map<String,String> rawCrewObj : crewRawObjList) {
                String str = JSON.serialize(rawCrewObj);
                CrewObj crewObject = (CrewObj) JSON.deserialize(str, CrewObj.class);

                crewObject.hyperlinkName = createHyperlink(crewObject.id, crewObject.name, 'people');

                if(crewObject.job.contains('Director') || crewObject.job.contains('Producer')) {
                    crewObjList.add(crewObject);
                }
            }

            movieDetail.castList = castObjList;
            movieDetail.crewList = crewObjList;
            movieDetail.casts = null;

            // add hyperLinks
            movieDetail.hyperlinkTitle = createHyperlink(String.valueOf(movieDetail.id), movieDetail.title, 'movie');
            
            responseBody = JSON.serialize(movieDetail);

        } catch (Exception e) {
            System.debug('Error in getMoviesDetails: ' + e.getMessage());
            responseBody = 'error';
        }

        responseFinal.add(responseBody);

        return responseFinal;
    }

    public static String createHyperlink(String id, String label, String type) {
        String nameUrl = 'https://orgfarm-3ac0276302-dev-ed.develop.my.site.com/persondetail?personid=' + id;
        String titleUrl = 'https://orgfarm-3ac0276302-dev-ed.develop.my.site.com/moviedetail?movieid=' + id;

        String url = type == 'movie' ? titleUrl : nameUrl;
        
        return '<a href="'+ url + '">' + label + '</a>';
    }
      
    public class MovieResultObj {
        public String original_language;
        public String original_title;
        public String overview;
        public Decimal popularity;
        public String title;
        public String release_date;
        public Integer id;
        public String hyperlinkTitle;

        public Decimal revenue;
        public Decimal budget;
        public Integer runtime;

        public List<CastObj> castList;
        public List<CrewObj> crewList;
        public Map<String, List<Map<String,String>>> casts;

        public List<ProductionCompany> production_companies;
    }

    public class CastObj {
        public String known_for_department;
        public String name;
        public Integer order;
        public String character;
        public String id;
        public String hyperlinkName;
    }

    public class CrewObj {
        public String known_for_department;
        public String name;
        public String job;
        public String character;
        public String id;
        public String hyperlinkName;
    }

    public class ProductionCompany {
        public String name;
        public String origin_country;
    }
}