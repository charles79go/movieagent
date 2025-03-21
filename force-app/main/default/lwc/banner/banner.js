import { LightningElement, api } from 'lwc';
import util from 'c/util';

export default class Banner extends LightningElement {

    @api tmdbApiKey;
    isBackdropReady = false;

    connectedCallback() {

        this.getPopularMovies();
    }

    async getPopularMovies() {

        let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.tmdbApiKey}&language=en-USinclude_adult=false&certification_country=US`;
        let response = await fetch(url);
        let results = await response.json();
        results = results.results;

        while(!this.backdropImage?.endsWith('.jpg')) {
            let movieData = results[util.getRandomInt(results.length)];
            this.backdropImage = `https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`;
        }
        this.isBackdropReady = true;
    }
}