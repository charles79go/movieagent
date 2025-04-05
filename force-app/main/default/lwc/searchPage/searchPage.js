import { LightningElement, api, wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import personSearch from "@salesforce/apex/TmdbApiCtrl.personSearch";
import movieSearch from "@salesforce/apex/TmdbApiCtrl.movieSearch";


export default class SearchPage extends LightningElement {

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
            let movieResponse = await movieSearch({searchTerm: this.searchQuery});
            let movieData = JSON.parse(movieResponse);
            this.movieSearchResults = movieData.results.filter(movie => {
                return movie.poster_path?.endsWith('.jpg');
            });

            let personResponse = await personSearch({searchTerm: this.searchQuery});
            let personData = JSON.parse(personResponse);
            this.personSearchResults = personData.results.filter(person => {
                return person.profile_path?.endsWith('.jpg');
            });

            this.dataReady = true;

        } catch(e) {
            console.log('search page error', e);
        }
    }

}