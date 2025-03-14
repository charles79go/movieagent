import { LightningElement, api, wire} from 'lwc';
import tmdbApiKey from "@salesforce/label/c.tmdbApiKey";
import { CurrentPageReference } from 'lightning/navigation';

export default class MovieDetailPage extends LightningElement {
    tmdbApiKey = tmdbApiKey;

    @wire(CurrentPageReference)
    currentPageRef;

    get movieId() {
        return this.currentPageRef.state.movieid;
    }

    connectedCallback(){
        this.getMovieDetail();
    }

    async getMovieDetail() {
        let url = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${this.tmdbApiKey}&language=en-US&append_to_response=release_dates,videos,images,casts`;

        let response = await fetch(url);
        let data = await response.json();

        console.log('>>> movie details', JSON.stringify(data,null,2));


        // https://www.youtube.com/watch?v=lMXh6vjiZrI  trailer images
        // https://i.ytimg.com/vi/lMXh6vjiZrI/hqdefault.jpg   trailers
    }
}