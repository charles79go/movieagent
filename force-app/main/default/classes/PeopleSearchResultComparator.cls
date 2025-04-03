public with sharing class PeopleSearchResultComparator implements Comparator<SearchPeopleAction.PersonResultObj> {

    public Integer compare(SearchPeopleAction.PersonResultObj personA, SearchPeopleAction.PersonResultObj personB) {
        // Compare by popularity
        if (personA.popularity == null && personB.popularity != null) {
            return 1;
        } else if (personA.popularity != null && personB.popularity == null) {
            return -1;
        } else if (personA.popularity != null && personB.popularity != null) {
            if (personA.popularity < personB.popularity) {
                return 1;
            } else if (personA.popularity > personB.popularity) {
                return -1;
            }
        }
        
        return 0;
    }
}