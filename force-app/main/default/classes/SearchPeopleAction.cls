public without sharing class SearchPeopleAction {
    @InvocableMethod(
        label='Search Actors'
        description='Search Actors'
    )
    public static List<String> searchPeople(
        List<String> personNameList
    ) {
        String personName = EncodingUtil.urlEncode(personNameList[0], 'UTF-8');
        String apiKey = System.Label.tmdbApiKey;
       
        String url = 'https://api.themoviedb.org/3/search/person?api_key=' + apiKey + 
                    '&language=en-US&query=' + personName + 
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

            // System.debug(JSON.serializePretty(responseBody));

            PeopleSearchResponse personResp = (PeopleSearchResponse) JSON.deserialize(responseBody, PeopleSearchResponse.class);
            // List<PersonResultObj> filteredPopular = new List<PersonResultObj>();

            // for(PersonResultObj pObj : personResp.results) {
            //     if(pObj.popularity > 1) {
            //         filteredPopular.add(pObj);
            //     }
            // }

            // personResp.results = filteredPopular;

            // Sort the list using the OrderLineComparator
            personResp.results.sort(new PeopleSearchResultComparator());

            responseBody = JSON.serialize(personResp);

        } catch (Exception e) {
            System.debug('Error in searchPeople: ' + e.getMessage());
            responseBody = 'error';
        }

        responseFinal.add(responseBody);

        return responseFinal;
    }



    public class PeopleSearchResponse {
        public Integer page;
        public Integer total_pages;
        public Integer total_results;
        public List<PersonResultObj> results;
    }
        
    public class PersonResultObj {
        public Integer id;
        public String name;
        public Decimal popularity;
        public List<MovieObj> known_for;
    }

    public class MovieObj {
        public Integer id;
        public String title;
        public String overview;
    }
}


