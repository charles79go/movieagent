import { LightningElement, api } from 'lwc';

export default class Banner extends LightningElement {

    @api tmdbApiKey;
    isBackdropReady = false;

    connectedCallback() {

        this.getPopularMovies();
    }

    getUrl(page) {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${this.tmdbApiKey}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    }

    async getPopularMovies() {

        let responses = await Promise.all([
            fetch(this.getUrl(1)),
            fetch(this.getUrl(2)),
        ])
        let [page1, page2] = responses;
        page1 = await page1.json();
        page2 = await page2.json();
        let results  = [
            ...page1.results,
            ...page2.results, 
        ];

        while(!this.backdropImage?.endsWith('.jpg')) {
            let movieData = results[this.getRandomInt(results.length)];
            this.backdropImage = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;
        }

        this.isBackdropReady = true;
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}