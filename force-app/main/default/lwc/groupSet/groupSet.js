import { LightningElement, api} from 'lwc';
import getGroupSetDataRec from "@salesforce/apex/TmdbApiCtrl.getGroupSetDataRec";

export default class GroupSet extends LightningElement {

    @api groupTitle;
    @api genre;
    @api movieArr = [];

    imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    movieList = [];

    connectedCallback() {
        if(this.genre) this.getMovies();
        else this.movieList = this.movieArr;
    }

    async getMovies() {

        try {
            let response = await getGroupSetDataRec({name: this.groupTitle});
            // console.log(JSON.stringify(data,null,2));});
            let data = JSON.parse(response);
            this.movieList = data.results;
        } catch(e) {
            console.log('groupSet error', e.message)
        }
    }
}