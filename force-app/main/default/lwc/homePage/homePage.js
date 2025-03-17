import { LightningElement } from 'lwc';
import tmdbApiKey from "@salesforce/label/c.tmdbApiKey";
import { NavigationMixin } from "lightning/navigation";

export default class HomePage extends NavigationMixin(LightningElement) {
    tmdbApiKey = tmdbApiKey;

    trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.tmdbApiKey}&language=en-USinclude_adult=false&certification_country=US`;
    
    actionUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&certification_country=US&with_genres=28`;

    animationUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&certification_country=US&with_genres=16`;

    gotoMovieDetailFn(event) {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'MovieDetail__c',
            },
            state: {
                movieid: event.detail.movieId,
            },
        });
    }
}