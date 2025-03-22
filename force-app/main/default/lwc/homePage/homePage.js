import { LightningElement } from 'lwc';
import tmdbApiKey from "@salesforce/label/c.tmdbApiKey";

export default class HomePage extends LightningElement {
    tmdbApiKey = tmdbApiKey;

    trendingUrl;
    actionUrl;
    animationUrl;

    connectedCallback() {
        this.trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.tmdbApiKey}&language=en-USinclude_adult=false&certification_country=US&sort_by=popularity.desc&vote_count.gte=10`;
        this.actionUrl = this.getGenreUrl(28);
        this.animationUrl = this.getGenreUrl(16);
        this.adventureUrl = this.getGenreUrl(12);
        this.familyUrl = this.getGenreUrl(10751);
        this.fantasyUrl = this.getGenreUrl(14);
        this.comedyUrl = this.getGenreUrl(35);
    }

    getGenreUrl(genre) {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${this.tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&certification_country=US&with_genres=${genre}&sort_by=popularity.desc&vote_count.gte=10&append_to_response=videos`;
    }
}