import { LightningElement, api } from 'lwc';
import util from 'c/util';

export default class MovieCard extends LightningElement {
    @api imageBaseUrl;
    @api movieObj;

    rendered = false;

    get posterImageSource(){
        return this.imageBaseUrl + this.movieObj.poster_path;
    }

    get releaseDate() {
        return util.displayDate(this.movieObj.release_date);
    }

    get movieScore() {
        let score = Number(this.movieObj.vote_average);
        return score === 10 ? 10 : score.toFixed(1);
    }

    sendMovieDetailsFn(){
        console.log('>>>>>', JSON.stringify(this.movieObj,null,2));
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