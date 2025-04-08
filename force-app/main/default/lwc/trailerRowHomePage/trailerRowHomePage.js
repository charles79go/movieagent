import { LightningElement} from 'lwc';
import getUpcomingTrailers from "@salesforce/apex/TmdbApiCtrl.getUpcomingTrailers";

export default class TrailerRowHomePage extends LightningElement {

    trailerArr = [];
    showTrailer = false;
    showTrailerSet = false;
    trailerUrl;

    connectedCallback() {
        this.getMovies();
    }

    playTrailerFn(e) {
        this.trailerUrl = `https://www.youtube.com/embed/${e.detail}?&autoplay=1`;
        this.showTrailer = true;
    }

    exitTrailerFn(){
        this.showTrailer = false;
        this.trailerUrl = null;
    }

    async getMovies() {

        try {
            let response = await getUpcomingTrailers();
            this.trailerArr = JSON.parse(response);

            this.showTrailerSet = true;
        } catch(e) {
            console.log('groupSet error', e.message)
        }
    }
}