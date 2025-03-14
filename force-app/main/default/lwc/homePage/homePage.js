import { LightningElement } from 'lwc';
import tmdbApiKey from "@salesforce/label/c.tmdbApiKey";
import { NavigationMixin } from "lightning/navigation";

export default class HomePage extends NavigationMixin(LightningElement) {
    tmdbApiKey = tmdbApiKey;

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