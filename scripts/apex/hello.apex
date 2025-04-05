
List<String> input = new List<String>{'Christopher Reeve'};

SearchPeopleAction.searchPeople(input);


SearchMoviesByGenre.ActionInput actionInput = new SearchMoviesByGenre.ActionInput();
List<String> genreList = new List<String>{'28','35'};
actionInput.genreList = genreList;

SearchMoviesByGenre.recommendMovies(new List<SearchMoviesByGenre.ActionInput>{actionInput});