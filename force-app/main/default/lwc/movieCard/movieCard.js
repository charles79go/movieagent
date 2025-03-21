import { LightningElement, api } from 'lwc';
import util from 'c/util';
import { NavigationMixin } from "lightning/navigation";


export default class MovieCard extends NavigationMixin(LightningElement) {
    @api imageBaseUrl;
    @api movieObj;

    rendered = false;
    showImage = false;
    posterImageSource;

    get releaseDate() {
        return util.displayDate(this.movieObj.release_date);
    }

    get movieScore() {
        let score = Number(this.movieObj.vote_average);
        return score === 10 ? 10 : score.toFixed(1);
    }

    connectedCallback() {
        if(this.movieObj?.poster_path.endsWith('.jpg')) {
            this.posterImageSource = this.imageBaseUrl + this.movieObj.poster_path;
            this.showImage = true;
        } else {
            this.showImage = false;
        }
    }

    sendMovieDetailsFn(){

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'MovieDetail__c',
            },
            state: {
                movieid: this.movieObj.id,
            },
        });
    }

    renderedCallback(){
        if(this.rendered) return;
        let scoreElem = this.template.querySelector('.score');
        let voteAverage = Number(this.movieObj.vote_average);
        if(voteAverage < 6 ) scoreElem.classList.add('color-red');
        if(voteAverage >= 6 && voteAverage < 7.5) scoreElem.classList.add('color-orange');
        if(voteAverage >= 7.5) scoreElem.classList.add('color-green')
        this.rendered = true;
    }
}