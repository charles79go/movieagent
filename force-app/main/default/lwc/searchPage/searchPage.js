import { LightningElement, api, wire} from 'lwc';
import tmdbApiKey from "@salesforce/label/c.tmdbApiKey";
import { CurrentPageReference } from 'lightning/navigation';
import util from 'c/util';

export default class SearchPage extends LightningElement {
    tmdbApiKey = tmdbApiKey;

    movieSearchResults = [];
    personSearchResults = [];
    dataReady = false;

    imageBaseUrl = 'https://image.tmdb.org/t/p/original';

    searchQuery = '';

    @wire(CurrentPageReference)
    currentPageRef(pageRef) {
    //   console.log('Page name:', pageRef.state.searchQuery);
      this.searchQuery = pageRef.state.searchQuery;

      this.searchMoviesFn();
    }

    async searchMoviesFn(){

        this.dataReady = false;

        // console.log('one call', this.searchQuery)

        try {
            let movieSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.tmdbApiKey}&language=en-US&query=${this.searchQuery}&page=1&include_adult=false`;

            let movieResponse = await fetch(movieSearchUrl);
            let movieData = await movieResponse.json();
            this.movieSearchResults = movieData.results;

            let personSearchUrl = `https://api.themoviedb.org/3/search/person?api_key=${this.tmdbApiKey}&language=en-US&query=${this.searchQuery}&page=1&include_adult=false`;

            let personResponse = await fetch(personSearchUrl);
            let personData = await personResponse.json();
            this.personSearchResults = personData.results;

            this.dataReady = true;

            // console.log('>>>>', JSON.stringify(this.movieSearchResults,null,2))
            // console.log('>>>>', JSON.stringify(this.personSearchResults,null,2))


            // console.log(this.movieSearchResults.results.length)
            // console.log(this.personSearchResults.results.length)

        } catch(e) {
            console.log('search page error', e);
        }
    }

}