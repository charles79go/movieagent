public without sharing class GetTrailersSchedCtrl {

    @future(callout=true)
    public static void getTrailers() {
        // get the upcoming movies list 
        String reponse = TmdbApiCtrl.getMoviesByGenre('upcoming');

        MovieSearchResponse movieListResponse = (MovieSearchResponse) JSON.deserialize(reponse, MovieSearchResponse.class);

        List<VideoObj> finalVideosList = new List<VideoObj>();

        for(MovieResultObj movieObj : movieListResponse.results) {

            String responseDetailStr = TmdbApiCtrl.getMovieDetail(String.valueOf(movieObj.id));
            MovieDetailObj responseDetail = (MovieDetailObj) JSON.deserialize(responseDetailStr, MovieDetailObj.class);

            List<VideoObj> currentVideoList = new List<VideoObj>();

            for(VideoObj video : responseDetail.videos.get('results')) {
                if(video.type == 'Trailer' &&
                    !video.name.toLowerCase().contains('restricted') &&
                    !video.name.toLowerCase().contains('english subtitle') &&
                    !video.name.toLowerCase().contains('vertical')  
                ) {
                    currentVideoList.add(video);
                }
            }
    
            if(currentVideoList.size() > 0) {
                finalVideosList.add(currentVideoList[0]);
            }   
        }

        // save in record 
        TrailerList__c trailerRecord = [
            SELECT Id, Payload__c, Name 
            FROM TrailerList__c 
            WHERE Name = 'UpcomingTrailers'
            LIMIT 1
        ];

        trailerRecord.Payload__c = JSON.serialize(finalVideosList);
        update trailerRecord;
    }

    @future(callout=true)
    public static void getBannerData() {
        String response = TmdbApiCtrl.getBannerData();
        
        MovieSearchResponse bannerListResponse = (MovieSearchResponse) JSON.deserialize(response, MovieSearchResponse.class);

        // save in record 
        TrailerList__c bannerRecord = [
            SELECT Id, Payload__c, Name 
            FROM TrailerList__c 
            WHERE Name = 'BannerData'
            LIMIT 1
        ];

        bannerRecord.Payload__c = JSON.serialize(bannerListResponse);
        update bannerRecord;

    }

    public static void getGenreData(String genreId, String genreName) {

        String response = TmdbApiCtrl.getMoviesByGenre(genreId);

        MovieSearchResponse genreListResponse = (MovieSearchResponse) JSON.deserialize(response, MovieSearchResponse.class);

        // save in record 
        TrailerList__c genreRecord = [
            SELECT Id, Payload__c, Name 
            FROM TrailerList__c 
            WHERE Name = :genreName
            LIMIT 1
        ];

        genreRecord.Payload__c = JSON.serialize(genreListResponse);
        update genreRecord;
    } 


    public class MovieSearchResponse {
        public List<MovieResultObj> results;
    }

    public class MovieResultObj {
        public String title;
        public Integer id;
        public String backdrop_path;
        public String release_date;
        public String vote_average;
        public String poster_path;
    }

    public class MovieDetailObj {
        public Map<String,List<VideoObj>> videos;
    }

    public class VideoObj {
        public String key;
        public String type; 
        public String name;
        public String id;
    }
}