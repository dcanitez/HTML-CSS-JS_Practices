function Storage(){

}
Storage.prototype.addMovieToStorage = function(newMovie){
    //retrieving array from the storage..
    let movies = this.getMoviesFromStorage();
    //adding new movie to storage
    movies.push(newMovie);
    //converting array to JSON string
    localStorage.setItem("movies",JSON.stringify(movies));
}

Storage.prototype.getMoviesFromStorage = function(){
    let movies;
    //checking local storage if the key 'movies' exists
    if(localStorage.getItem("movies") === null){
        movies = [];
    }else{
        //because our local storage accepts string values
        //we need to parse it to array 
        movies = JSON.parse(localStorage.getItem("movies"));
    }
    return movies;
}

Storage.prototype.deleteMovieFromStorage = function(movieTitle){
    let movies= this.getMoviesFromStorage();
    movies.forEach(function(movie,index){
        if(movie.title === movieTitle){
            movies.splice(index,1);
        }
    });

    localStorage.setItem('movies',JSON.stringify(movies));
}

Storage.prototype.clearAllMoviesFromStorage = function (){

    localStorage.removeItem('movies');
}