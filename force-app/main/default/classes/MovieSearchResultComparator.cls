public with sharing class MovieSearchResultComparator implements Comparator<SearchMovieAction.MovieResultObj> {

    public Integer compare(SearchMovieAction.MovieResultObj movieA, SearchMovieAction.MovieResultObj movieB) {
        // Compare by popularity
        if (movieA.popularity == null && movieB.popularity != null) {
            return 1;
        } else if (movieA.popularity != null && movieB.popularity == null) {
            return -1;
        } else if (movieA.popularity != null && movieB.popularity != null) {
            if (movieA.popularity < movieB.popularity) {
                return 1;
            } else if (movieA.popularity > movieB.popularity) {
                return -1;
            }
        }
        
        return 0;
    }
}