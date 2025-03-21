import { LightningElement, api, wire} from 'lwc';
import tmdbApiKey from "@salesforce/label/c.tmdbApiKey";
import { CurrentPageReference } from 'lightning/navigation';
import util from 'c/util';

export default class PersonDetailPage extends LightningElement {

    tmdbApiKey = tmdbApiKey;

    personDetails;
    movieArr;

    posterImage;
    showImage = false;
    movieArrReady = false;
    isBackdropReady = false;
    imageBaseUrl = 'https://image.tmdb.org/t/p/original';
    birthday;

    backdropImage;
    showBackdropImage = false;


    @wire(CurrentPageReference)
    currentPageRef;

    get personId() {
        return this.currentPageRef.state.personid;
    }

    connectedCallback(){
        this.getPersonDetail();
    }

    async getPersonDetail() {

        try {
            let url = `https://api.themoviedb.org/3/person/${this.personId}?api_key=${this.tmdbApiKey}&language=en-US&append_to_response=movie_credits`;

            let response = await fetch(url);
            this.personDetails = await response.json();
    
            this.birthday = util.displayDate(this.personDetails.birthday);
    
            this.movieArr = this.personDetails?.movie_credits?.cast;
    
            this.movieArr.sort((a,b) => {
                if(a.release_date < b.release_date) return 1;
                if(a.release_date > b.release_date) return -1;
                return 0;
            })
    
            this.movieArrReady = true;
    
            let count = 0;
            let exitNow = false;
            while(!this.backdropImage?.endsWith('.jpg') && !exitNow) {
                let movieData = this.movieArr[util.getRandomInt(this.movieArr.length)];
                this.backdropImage = `https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`;
    
                count++;
                if(count >= this.movieArr.length) {
                    exitNow = true;
                }
            }
    
            this.showBackdropImage = this.backdropImage?.endsWith('.jpg');
    
            if(this.personDetails?.profile_path?.endsWith('.jpg')) {
                this.posterImage = `${this.imageBaseUrl}${this.personDetails?.profile_path}`;
                this.showImage = true;
            } else {
                this.showImage = false;
            }
    
            this.isBackdropReady = true;
        } catch(e) {
            console.log('personDetailPage error', e);
        }
    }

}