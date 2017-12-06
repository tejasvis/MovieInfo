$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let movieValue = $('#searchText').val();

        getMovies(movieValue);
        e.preventDefault();

    });


});
/*fetches the movies based on the search text through the OMDB API*/
function getMovies(movieName) {
    axios.get('http://www.omdbapi.com/?apikey=e90667c3&s=' + movieName)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let displayMovies = '';
            //jquery each loop to iterate through each movie fetched
            $.each(movies, (index, movieNames) => {

                displayMovies += `
            <div class="col-md-3">
                <div class="well text-center">
                <img src="${movieNames.Poster}">
                <h5> ${movieNames.Title}</h5>
                <a onclick="movieSelect('${movieNames.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>

            </div>
            `;
            });

            $('#movies').html(displayMovies);
        })
        .catch((err) => {
            console.log("Error is" + err);
        });
}
/*storing the id of each movie displayed in the session storage*/
function movieSelect(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;

}

/*Retrieves the selected movie details to be displayed*/
function getMovie() {
    //fetching the id from the session storage
    let movId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?apikey=e90667c3&i=' + movId)
        .then((response) => {
            console.log(response);
            let Movie = response.data;
            let movieDisplay = `
            <div class="row">
            <div clas="col-md-4">
            <img src="${Movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
            <h2> ${Movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"> <strong> Genre:${Movie.Genre}</strong></li>
            <li class="list-group-item"> <strong> Released:${Movie.Released}</strong></li>
            <li class="list-group-item"> <strong> Language:${Movie.Language}</strong></li>
            <li class="list-group-item"> <strong> Director:${Movie.Director}</strong></li>
            <li class="list-group-item"> <strong> Website:${Movie.Website}</strong></li>
            <li class="list-group-item"> <strong> Writer:${Movie.Writer}</strong></li>
            <li class="list-group-item"> <strong> Year:${Movie.Year}</strong></li>
            <li class="list-group-item"> <strong> imdbRating:${Movie.imdbRating}</strong></li>
            </ul>
            </div>
            </div>
            
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>${Movie.Plot}
                    <a href="http://imdb.com/title/${Movie.imdbID}" target=_blank class="btn btn-primary">View Movie in IMDB</a>
                    <a href="index.html" class="btn btn-default"> Back To Search</a>
                </div>

            </div>
            `;

            $('#movie').html(movieDisplay);

        })
        .catch((error) => {
            console.log(error);
        })
}