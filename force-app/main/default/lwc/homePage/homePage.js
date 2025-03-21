import { LightningElement } from 'lwc';
import tmdbApiKey from "@salesforce/label/c.tmdbApiKey";

export default class HomePage extends LightningElement {
    tmdbApiKey = tmdbApiKey;

    trendingUrl;
    actionUrl;
    animationUrl;

    connectedCallback() {
        this.trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.tmdbApiKey}&language=en-USinclude_adult=false&certification_country=US`;
        this.actionUrl = this.getGenreUrl(28);
        this.animationUrl = this.getGenreUrl(16);
    }

    getGenreUrl(genre) {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${this.tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&certification_country=US&with_genres=${genre}&append_to_response=videos`;
    }
}