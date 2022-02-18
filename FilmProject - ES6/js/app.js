//to reach the content from the UI
const form = document.getElementById('movie-form');
const titleElement = document.querySelector('#title');
const directorElement = document.querySelector('#director');
const urlElement = document.querySelector('#url');
const cardBody=document.querySelectorAll('.card-body')[1];
const clear=document.getElementById('clear-movies');

//to activate all events
eventListeners();

// all events will be defined under this function
function eventListeners(){
    form.addEventListener('submit',addMovie);
    //to retrieve data from local storage we added an event to the document.
    document.addEventListener('DOMContentLoaded',function(){
        let movies=Storage.getMoviesFromStorage();
        UI.loadAllMovies(movies);
    });
    cardBody.addEventListener('click',deleteMovie);
    clear.addEventListener('click',clearAllMovies);
}

function addMovie(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;

    if(title === ""||director === ""||url === ""){
        UI.displayMessages("Please fill all fields.","danger");
    }else{
        const newMovie=new Movie(title,director,url);        
        UI.addMovieToUI(newMovie);
        Storage.addMovieToStorage(newMovie);
        UI.displayMessages("Movie information successfully added","success");
    }
    UI.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}

function deleteMovie(e){
    
    if(e.target.id === 'delete-movie'){
        UI.deleteMovieFromUI(e.target);
        Storage.deleteMovieFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Movie is deleted successfully","success");
    }
}

function clearAllMovies(){

    if(confirm('Are you sure you want to delete all movies from the list?')){        
        UI.clearAllMoviesFromUI();
        Storage.clearAllMoviesFromStorage();
    }

}