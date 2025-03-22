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
            // let movieSearchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&certification_country=US&sort_by=popularity.desc&vote_count.gte=10&with_keywords=${this.searchQuery}&append_to_response=videos`;

            let movieResponse = await fetch(movieSearchUrl);
            let movieData = await movieResponse.json();
            this.movieSearchResults = movieData.results.filter(movie => {
                return movie.poster_path?.endsWith('.jpg');
            });

            let personSearchUrl = `https://api.themoviedb.org/3/search/person?api_key=${this.tmdbApiKey}&language=en-US&query=${this.searchQuery}&page=1&include_adult=false`;

            let personResponse = await fetch(personSearchUrl);
            let personData = await personResponse.json();
            this.personSearchResults = personData.results.filter(person => {
                return person.profile_path?.endsWith('.jpg');
            });

            this.dataReady = true;

        } catch(e) {
            console.log('search page error', e);
        }
    }

}