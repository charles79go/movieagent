import { LightningElement, api} from 'lwc';

export default class GroupSet extends LightningElement {

    @api groupTitle;
    @api url;
    @api movieArr = [];

    imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    movieList = [];

    connectedCallback() {
        if(this.url) this.getMovies();
        else this.movieList = this.movieArr;
    }

    async getMovies() {
        let response = await fetch(this.url);
        let data = await response.json();
        this.movieList = data.results;

    }

}