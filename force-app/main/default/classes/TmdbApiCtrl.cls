public without sharing class TmdbApiCtrl {

    @AuraEnabled(cacheable=true)
    public static string getBannerData() {
        try {

            String apiKey = System.Label.tmdbApiKey;
            String url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + apiKey + 
                    '&language=en-USinclude_adult=false&certification_country=US';

            return calloutFn(url);

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static string getMoviesByGenre(String genre){
        try {

            String apiKey = System.Label.tmdbApiKey;

            String url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey +
                    '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&certification_country=US&with_genres=' + genre + '&sort_by=popularity.desc&vote_count.gte=10&append_to_response=videos';

            if(genre == 'trending') {
                url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + apiKey +
                    '&language=en-USinclude_adult=false&certification_country=US&sort_by=popularity.desc&vote_count.gte=10';
            }

            if(genre == 'upcoming') {
                String minDateFinal = Datetime.now().format('yyyy-MM-dd');
                String maxDateFinal = Datetime.now().addMonths(5).format('yyyy-MM-dd');
               
                url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey +
                            '&language=en-US&sort_by=popularity.desc&include_adult=false' +
                             '&certification_country=US&primary_release_date.gte=' + minDateFinal +
                             '&primary_release_date.lte=' + maxDateFinal;
            }

            return calloutFn(url);
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static string personSearch(String searchTerm){
        try {

            String apiKey = System.Label.tmdbApiKey;

            String query = EncodingUtil.urlEncode(searchTerm, 'UTF-8');

            String url = 'https://api.themoviedb.org/3/search/person?api_key=' + apiKey + 
                        '&language=en-US&query=' + query + '&page=1&include_adult=false';

            return calloutFn(url);
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static string movieSearch(String searchTerm){
        try {

            String apiKey = System.Label.tmdbApiKey;

            String query = EncodingUtil.urlEncode(searchTerm, 'UTF-8');

            String url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + 
                        '&language=en-US&query=' + query + '&page=1&include_adult=false';

            return calloutFn(url);
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static string getMovieDetail(String movieId){
        try {

            String apiKey = System.Label.tmdbApiKey;

            String url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + apiKey+ 
                    '&language=en-US&append_to_response=release_dates,videos,images,casts';

            return calloutFn(url);
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static string getPersonDetail(String personId){
        try {

            String apiKey = System.Label.tmdbApiKey;

            String url = 'https://api.themoviedb.org/3/person/' + personId + '?api_key=' + apiKey+ 
                    '&language=en-US&append_to_response=movie_credits';

            return calloutFn(url);
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static string getUpcomingTrailers(){
        try {
            TrailerList__c trailerRecord = [
                SELECT Id, Payload__c, Name 
                FROM TrailerList__c 
                WHERE Name = 'UpcomingTrailers' 
                LIMIT 1
            ];

            return trailerRecord.Payload__c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static string getBannerDataRec(){
        try {
            TrailerList__c trailerRecord = [
                SELECT Id, Payload__c, Name 
                FROM TrailerList__c 
                WHERE Name = 'BannerData' 
                LIMIT 1
            ];

            return trailerRecord.Payload__c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static string getGroupSetDataRec(String name){
        try {
            TrailerList__c trailerRecord = [
                SELECT Id, Payload__c, Name 
                FROM TrailerList__c 
                WHERE Name = :name 
                LIMIT 1
            ];

            return trailerRecord.Payload__c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static string calloutFn(String url) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');

        Http http = new Http();
        HttpResponse res = http.send(req);

        String responseBody = '';
        if (res.getStatusCode() == 200 || res.getStatusCode() == 201) {
            // Process the response, e.g., parse the JSON response
            responseBody = res.getBody();
        }

        return responseBody;
    }
}