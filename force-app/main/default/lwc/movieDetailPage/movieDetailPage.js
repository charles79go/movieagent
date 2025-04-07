import { LightningElement, wire} from 'lwc';
import getMovieDetail from "@salesforce/apex/TmdbApiCtrl.getMovieDetail";
import { CurrentPageReference } from 'lightning/navigation';
import util from 'c/util';

export default class MovieDetailPage extends LightningElement {

    @wire(CurrentPageReference)
    currentPageRef;

    movieDetails;
    trailerArr;
    castArr;
    isBackdropReady = false;
    backdropImage;
    posterImage;
    showTrailerSet = false;
    showTrailer = false;
    showImage = false;
    showBackdropImage = false;
    trailerUrl;
    
    imageBaseUrl = 'https://image.tmdb.org/t/p/original';

    get movieId() {
        return this.currentPageRef.state.movieid;
    }

    get certification(){
        if(this.movieDetails.release_dates === null) return '--'
        let usCert = this.movieDetails.release_dates.results.find(release => release.iso_3166_1 === 'US');
        // if 'US' cert found
        if(usCert) return usCert.release_dates[0].certification;
        // else
        return 'Not Rated';
  
    }

    get genre(){
        let gList = this.movieDetails.genres.map(g => g.name);
        return gList.join(', ');
    }

    get releaseDate(){
        return util.displayDate(this.movieDetails.release_date);
    }

    connectedCallback(){
        this.getMovieDetail();
    }

    async getMovieDetail() {

        try {
            let response = await getMovieDetail({movieId: this.movieId});
            this.movieDetails = JSON.parse(response);

            this.trailerArr = this.movieDetails.videos.results.filter(video => {
                return (video.type === 'Trailer' &&
                        !video.name.toLowerCase().includes('restricted') &&
                        !video.name.toLowerCase().includes('english subtitle'));
            });

            console.log('>>>>', JSON.stringify(this.trailerArr,null,2));
            this.castArr = this.movieDetails.casts.cast.filter(person => person.known_for_department === 'Acting');
    
            this.castArr = this.castArr.slice(0, 15);
    
            if(this.movieDetails?.backdrop_path?.endsWith('.jpg')) {
                this.backdropImage = `${this.imageBaseUrl}${this.movieDetails?.backdrop_path}`;
                this.showBackdropImage = true;
            } else {
                this.showBackdropImage = false;
            }
    
            if(this.movieDetails?.poster_path?.endsWith('.jpg')) {
                this.posterImage = `${this.imageBaseUrl}${this.movieDetails?.poster_path}`;
                this.showImage = true;
            } else {
                this.showImage = false;
            }
 
            this.showTrailerSet = this.trailerArr.length;
            this.isBackdropReady = true;
        } catch(e) {
            console.log('movieDetail error', e);
        }
    }

    playTrailerFn(e) {
        this.trailerUrl = `https://www.youtube.com/embed/${e.detail}?&autoplay=1`;
        this.showTrailer = true;
    }

    exitTrailerFn(){
        this.showTrailer = false;
        this.trailerUrl = null;
    }

}