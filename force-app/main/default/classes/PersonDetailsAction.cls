public without sharing class PersonDetailsAction {

    @InvocableMethod(
        label='Get actor details by id'
        description='Get actor details using person id'
    )
    public static List<String> getPersonDetails(
        List<Integer> personId
    ) {
        String responseBody = '';
        List<String> responseFinal = new List<String>();
        String apiKey = System.Label.tmdbApiKey;

        Integer inputId = personId[0];

        try {

            String personDetailUrl = 'https://api.themoviedb.org/3/person/' + inputId + '?api_key=' + apiKey + 
                                    '&language=en-US&append_to_response=movie_credits';
            // second request for movie details
            HttpRequest personDetailRequest = new HttpRequest();
            personDetailRequest.setEndpoint(personDetailUrl);
            personDetailRequest.setMethod('GET');

            // Send the request and receive the response
            Http http = new Http();

            HttpResponse personDetailResponse = http.send(personDetailRequest);

            // Handle the response
            if (personDetailResponse.getStatusCode() == 200 || personDetailResponse.getStatusCode() == 201) {
                // Process the response, e.g., parse the JSON response
                responseBody = personDetailResponse.getBody();
            } else {
                System.debug('Error: ' + personDetailResponse.getStatus());
                responseBody = 'error';
            }

            // System.debug(responseBody);

            Map<String, Object> rawPersonDetail = (Map<String, Object>) JSON.deserializeUntyped(responseBody);

            PersonResultObj personResult = new PersonResultObj();
            personResult.biography = (String) rawPersonDetail.get('biography');
            personResult.birthday = (String) rawPersonDetail.get('birthday');
            personResult.deathday = (String) rawPersonDetail.get('deathday');
            personResult.popularity = (Decimal) rawPersonDetail.get('popularity');
            personResult.id = (Integer) rawPersonDetail.get('id');
            personResult.place_of_birth = (String) rawPersonDetail.get('place_of_birth');
            personResult.name = (String) rawPersonDetail.get('name');
            
            List<Object> rawAlsoKnownNameList = (List<Object>) rawPersonDetail.get('also_known_as');
            List<String> alsoKnownNameList = new List<String>();
            for(Object objName : rawAlsoKnownNameList) {
                alsoKnownNameList.add((String) objName);
            }

            personResult.also_known_as = alsoKnownNameList;


            List<MovieObj> movieObjList = new List<MovieObj>();

            Map<String, Object> rawMovieCreditObj = (Map<String, Object>) rawPersonDetail.get('movie_credits');

            List<Object> rawCastList = (List<Object>) rawMovieCreditObj.get('cast');
            List<Object> rawCrewList = (List<Object>) rawMovieCreditObj.get('crew');
            

            if(rawCastList != null) {
                for(Object obj : rawCastList) {
                    Map<String, Object> rawMovieObj = (Map<String, Object>) obj;
    
                    MovieObj mObj = new MovieObj();
                    mObj.popularity = (Decimal) rawMovieObj.get('popularity');
                    mObj.title = (String) rawMovieObj.get('title');
                    mObj.id = (Integer) rawMovieObj.get('id');
    
                    movieObjList.add(mObj);
                }
            }

            if(rawCrewList != null) {
                for(Object obj : rawCrewList) {
                    Map<String, Object> rawMovieObj = (Map<String, Object>) obj;
    
                    MovieObj mObj = new MovieObj();
                    mObj.popularity = (Decimal) rawMovieObj.get('popularity');
                    mObj.title = (String) rawMovieObj.get('title');
                    mObj.id = (Integer) rawMovieObj.get('id');
    
                    movieObjList.add(mObj);
                }
            }


            if(movieObjList.size() > 1) {
                movieObjList.sort(new KnownForComparator());
            }

            Integer counter = 0; 
            List<MovieObj> finalList = new List<MovieObj>();
            for(MovieObj mObj : movieObjList) {

                mObj.hyperlinkTitle = createHyperlink(String.valueOf(mObj.id), mObj.title, 'movie');
                finalList.add(mObj);

                counter++;
                if(counter == 5) break;
            }


            personResult.movieList = finalList;
            personResult.movie_credits = null;

            // add hyperLinks
            personResult.hyperlinkName = createHyperlink(String.valueOf(personResult.id), personResult.name, 'person');
            
            responseBody = JSON.serialize(personResult);

        } catch (Exception e) {
            System.debug('Error in getPersonDetails: ' + e.getMessage());
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
      
    public class PersonResultObj {
        public String biography;
        public String birthday;
        public String deathday;
        public Decimal popularity;
        public Integer id;
        public String hyperlinkName;
        public String place_of_birth;
        public String name;

        public List<String> also_known_as;

        public List<MovieObj> movieList;

        public Map<String, List<Map<String,Object>>> movie_credits;
    }

    public class MovieObj {
        public Decimal popularity;
        public String title;
        public Integer id;
        public String hyperlinkTitle;
    }
}