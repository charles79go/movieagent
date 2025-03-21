import { LightningElement, api} from 'lwc';

export default class GroupSet extends LightningElement {

    @api groupTitle;
    @api url;

    imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    movieList = [];

    connectedCallback() {
        this.getMovies(this.genreNumber);
    }

    async getMovies() {
        let response = await fetch(this.url);
        let data = await response.json();
        this.movieList = data.results;

    }

}