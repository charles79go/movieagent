public without sharing class KnownForComparator implements Comparator<PersonDetailsAction.MovieObj> {

    public Integer compare(PersonDetailsAction.MovieObj movieA, PersonDetailsAction.MovieObj movieB) {
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