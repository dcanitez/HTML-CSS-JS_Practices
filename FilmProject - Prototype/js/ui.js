//User Interface operations will be conducted by this object
function UI(){

}
UI.prototype.addMovieToUI = function(newMovie){
    const movieList=document.getElementById('movies');
    movieList.innerHTML+=`
            <tr>
                <td><img src="${newMovie.url}" class="img-fluid img-thumbnail" style="width:300px;height:400px;"></td>
                <td>${newMovie.title}</td>
                <td>${newMovie.director}</td>
                <td><a href="#" id = "delete-movie" class = "btn btn-danger">Delete</a></td>
            </tr>  
    `;
}

UI.prototype.clearInputs=function(e1,e2,e3){
    e1.value="";
    e2.value="";
    e3.value="";
}

UI.prototype.displayMessages=function(message,type){

    const alert=document.querySelector('#alert');
    let alertMessage="";
    if(type==="success"){
        alertMessage=`<div class="alert alert-success d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img"   aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                        <div>${message}</div>`;
    }else{
        alertMessage=`<div class="alert alert-danger d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img"   aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>${message}</div>`;
    };
    alert.innerHTML=alertMessage;

    setTimeout(function(){
        alert.remove();
    },1000);
}

//retrieving movies from the local storage
UI.prototype.loadAllMovies=function(movies){

    const movieList=document.getElementById('movies');
    movies.forEach(function(movie){
        movieList.innerHTML+=`
                        <tr>
                        <td><img src="${movie.url}" class="img-fluid img-thumbnail"style="width:300px; height:400px;"></td>
                        <td>${movie.title}</td>
                        <td>${movie.director}</td>
                        <td><a href="#" id = "delete-movie" class = "btn btn-danger">Delete</a></td>
                        </tr>`;
    });
}
UI.prototype.deleteMovieFromUI = function(element){
    element.parentElement.parentElement.remove();
}

UI.prototype.clearAllMoviesFromUI = function(){
    const movieList=document.getElementById('movies');

    while(movieList.firstElementChild !== null){
        movieList.firstElementChild.remove();
    }

    //not using below method because it works slower instead above method is used.
    // movieList.innerHTML="";
}