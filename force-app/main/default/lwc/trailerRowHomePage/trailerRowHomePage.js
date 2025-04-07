import { LightningElement, api} from 'lwc';
import getMoviesByGenre from "@salesforce/apex/TmdbApiCtrl.getMoviesByGenre";
import getMovieDetail from "@salesforce/apex/TmdbApiCtrl.getMovieDetail";

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
            let response = await getMoviesByGenre({genre: 'upcoming'});
            let data = JSON.parse(response);

            let movieList = data.results;
            let movieIdList = movieList.map(movie => movie.id);

            // get only the first 5 ids from the movieIdList
            let firstFiveIds = movieIdList.slice(0, 7);

            let responses = await Promise.all([
                getMovieDetail({movieId: firstFiveIds[0]}),
                getMovieDetail({movieId: firstFiveIds[1]}),
                getMovieDetail({movieId: firstFiveIds[2]}),
                getMovieDetail({movieId: firstFiveIds[3]}),
                getMovieDetail({movieId: firstFiveIds[4]}),
                getMovieDetail({movieId: firstFiveIds[5]}),
                getMovieDetail({movieId: firstFiveIds[6]})
            ])

            let [movie1, movie2, movie3, movie4, movie5, movie6, movie7] = responses;
            movie1 = JSON.parse(movie1);
            movie2 = JSON.parse(movie2);
            movie3 = JSON.parse(movie3);
            movie4 = JSON.parse(movie4);
            movie5 = JSON.parse(movie5);
            movie6 = JSON.parse(movie6);
            movie7 = JSON.parse(movie7);

            let moviesArr = [movie1, movie2, movie3, movie4, movie5, movie6, movie7];
            moviesArr.forEach(movie => {
                let movTrailerArr = movie?.videos?.results?.filter(video => {
                    return (video.type === 'Trailer' &&
                            !video.name.toLowerCase().includes('restricted') &&
                            !video.name.toLowerCase().includes('english subtitle') &&
                            !video.name.toLowerCase().includes('vertical'))
                });

                if(movTrailerArr.length > 0) this.trailerArr.push(movTrailerArr[0]);
            });

            // console.log(JSON.stringify(this.trailerArr,null,2));

            this.showTrailerSet = true;
        } catch(e) {
            console.log('groupSet error', e.message)
        }
    }
}