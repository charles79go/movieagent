public without sharing class SearchMovieAction {

    @InvocableMethod(
        label='Search Movies'
        description='Search Movies'
    )
    public static List<String> searchMovies(
        List<String> titles
    ) {
        String movieTitle = EncodingUtil.urlEncode(titles[0], 'UTF-8');
        String apiKey = System.Label.tmdbApiKey;
        
        String url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + 
                    '&language=en-US&query=' + movieTitle + 
                    '&page=1&include_adult=false';

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

            // Sort the list using the OrderLineComparator
            movieResp.results.sort(new MovieSearchResultComparator());

            responseBody = JSON.serialize(movieResp);

        } catch (Exception e) {
            System.debug('Error in getMoviesDetails: ' + e.getMessage());
            responseBody = 'error';
        }

        responseFinal.add(responseBody);

        return responseFinal;
    }



    public class MovieSearchResponse {
        public Integer page;
        public Integer total_pages;
        public Integer total_results;
        public List<MovieResultObj> results;
    }
        
    public class MovieResultObj {
        public String original_language;
        public String original_title;
        public String overview;
        public Decimal popularity;
        public String title;
        public String release_date;
        public Integer id;
    }

}