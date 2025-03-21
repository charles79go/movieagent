import { LightningElement, api, wire} from 'lwc';
import tmdbApiKey from "@salesforce/label/c.tmdbApiKey";
import { CurrentPageReference } from 'lightning/navigation';
import util from 'c/util';

export default class MovieDetailPage extends LightningElement {
    tmdbApiKey = tmdbApiKey;

    @wire(CurrentPageReference)
    currentPageRef;

    movieDetails;
    trailerArr;
    castArr;
    isBackdropReady = false;
    backdropImage;
    posterImage;
    showTrailerSet = false;
    
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
        let url = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${this.tmdbApiKey}&language=en-US&append_to_response=release_dates,videos,images,casts`;

        let response = await fetch(url);
        this.movieDetails = await response.json();

        console.log('>>> movie details', JSON.stringify(this.movieDetails,null,2));

        this.trailerArr = this.movieDetails.videos.results.filter(video => video.type === 'Trailer');
        this.castArr = this.movieDetails.casts.cast.filter(person => person.known_for_department === 'Acting');

        this.backdropImage = `${this.imageBaseUrl}${this.movieDetails?.backdrop_path}`;
        this.posterImage = `${this.imageBaseUrl}${this.movieDetails?.poster_path}`;


        this.showTrailerSet = this.trailerArr.length;
        this.isBackdropReady = true;
        console.log('>>> cast', JSON.stringify(this.castArr,null,2));
        // console.log('>>> trailer', JSON.stringify(this.trailerArr,null,2));


        // https://www.youtube.com/watch?v=lMXh6vjiZrI  trailer images
        // https://i.ytimg.com/vi/lMXh6vjiZrI/hqdefault.jpg   trailers
    }

}