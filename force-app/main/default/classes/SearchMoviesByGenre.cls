public without sharing class SearchMoviesByGenre {

    public class ActionInput{
        @InvocableVariable 
        public List<String> genreList;
    }

    @InvocableMethod(
        label='Recommend movies by by Genre'
        description='Recommend movies by by Genre'
    )
    public static List<String> recommendMovies(List<ActionInput> actionInpt) {

        String apiKey = System.Label.tmdbApiKey;

        List<String> genreList = actionInpt[0].genreList;

        String genreString = '';

        if(genreList.size() > 1 ) {

            for(String genre : genreList){
                genreString += genre + ',';
            }

            genreString = genreString.removeEnd(',');
        } else {
            genreString = genreList[0];
        }

        String url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + 
                        '&language=en-US&sort_by=popularity.desc&include_adult=false&certification_country=US&with_genres=' + genreString + 
                        '&sort_by=popularity.desc&vote_count.gte=10';

        String responseBody = '';
        List<String> responseFinal = new List<String>();

        try {

            // Create a new HTTP request
            HttpRequest req = new HttpRequest();
            req.setEndpoint(url);
            req.setMethod('GET');

            // Create an HTTP object to send the request
            Http http = new Http();

            // Send the request and receive the response
            HttpResponse res = http.send(req);

            // Handle the response
            if (res.getStatusCode() == 200 || res.getStatusCode() == 201) {
                // Process the response, e.g., parse the JSON response
                responseBody = res.getBody();
            } else {
                System.debug('Error: ' + res.getStatus());
                responseBody = 'error';
            }

            if(responseBody == 'error') {
                return new List<String>{responseBody};
            }

            MovieSearchResponse movieResp = (MovieSearchResponse) JSON.deserialize(responseBody, MovieSearchResponse.class);

            movieResp.results = randomize(movieResp.results);

            responseBody = JSON.serialize(movieResp);

        } catch (Exception e) {
            System.debug('Error in searchPeople: ' + e.getMessage());
            responseBody = 'error';
        }

        responseFinal.add(responseBody);

        return responseFinal;

    }

    public static List<MovieResultObj> randomize(List<MovieResultObj> lst){
        Integer currentIndex = lst.size();
        MovieResultObj temporaryValue;
        Integer randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
        // Pick a remaining element...
          randomIndex = Integer.valueOf(Math.floor(Math.random() * currentIndex));
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = lst[currentIndex];
          lst[currentIndex] = lst[randomIndex];
          lst[randomIndex] = temporaryValue;
        }
        return lst;
      }


    public class MovieSearchResponse {
        public List<MovieResultObj> results;
    }
        
    public class MovieResultObj {
        public Decimal popularity;
        public String title;
        public Integer id;
        public String overview;
        public String release_date;
        public List<String> genre_ids;
    }
}