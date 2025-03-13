import { LightningElement, api} from 'lwc';

export default class GroupSet extends LightningElement {

    @api groupTitle;
    @api tmdbApiKey;
    @api genreNumber;

    imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    movieList = [];

    connectedCallback() {
        this.getMovies(this.genreNumber);
    }

    async getMovies() {

        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&certification_country=US&with_genres=${this.genreNumber}`;

        if(this.genreNumber === 'popular') {
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.tmdbApiKey}`;
        }

        let response = await fetch(url);
        let data = await response.json();
        this.movieList = data.results;
    }

}