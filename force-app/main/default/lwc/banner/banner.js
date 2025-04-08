import { LightningElement } from 'lwc';
import getBannerDataRec from "@salesforce/apex/TmdbApiCtrl.getBannerDataRec";
import util from 'c/util';

export default class Banner extends LightningElement {

    isBackdropReady = false;

    connectedCallback() {

        this.getPopularMovies();
    }

    async getPopularMovies() {

        try {
            let response = await getBannerDataRec();
            let results = JSON.parse(response);

            results = results.results;
    
            let counter = 0;
            let exitNow = false;
            while(!this.backdropImage?.endsWith('.jpg') && !exitNow) {
                let movieData = results[util.getRandomInt(results.length)];
                this.backdropImage = `https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`;

                counter++;
                if(counter >= results.length) {
                    exitNow = true;
                }
            }
            this.isBackdropReady = true;
        } catch (e) {
            console.log('banner error', e);
        }
    }
}