
List<String> input = new List<String>{'Christopher Reeve'};

SearchPeopleAction.searchPeople(input);


SearchMoviesByGenre.ActionInput actionInput = new SearchMoviesByGenre.ActionInput();
List<String> genreList = new List<String>{'28','35'};
actionInput.genreList = genreList;

SearchMoviesByGenre.recommendMovies(new List<SearchMoviesByGenre.ActionInput>{actionInput});


System.debug('')


https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2025-05-01&primary_release_date.lte=2025-10-01&region=US&sort_by=popularity.desc


System.debug('===' + Date.today());

Date dateToday = Date.today();
Date maxDate = dateToday.addMonths(5);

String minDateFinal = dateToday.format('yyyy-MM-dd');
String maxDateFinal = maxDate.format('yyyy-MM-dd');

System.debug('===' + minDateFinal);
System.debug('===' + maxDateFinal);

Date dateToday = Date.today();
Date maxDate = dateToday.addMonths(5);

String minDateFinal = Datetime.now().format('yyyy-MM-dd');
String maxDateFinal = Datetime.now().addMonths(5).format('yyyy-MM-dd');

System.debug('===' + minDateFinal);
System.debug('===' + maxDateFinal);