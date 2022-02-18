//to reach the content from the UI
const form = document.getElementById('movie-form');
const titleElement = document.querySelector('#title');
const directorElement = document.querySelector('#director');
const urlElement = document.querySelector('#url');
const cardBody=document.querySelectorAll('.card-body')[1];
const clear=document.getElementById('clear-movies');

//UI Object
const ui=new UI();
//Storage Object
const storage=new Storage();

//to activate all events
eventListeners();

// all events will be defined under this function
function eventListeners(){
    form.addEventListener('submit',addMovie);
    //to retrieve data from local storage we added an event to the document.
    document.addEventListener('DOMContentLoaded',function(){
        let movies=storage.getMoviesFromStorage();
        ui.loadAllMovies(movies);
    });
    cardBody.addEventListener('click',deleteMovie);
    clear.addEventListener('click',clearAllMovies);
}

function addMovie(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;

    if(title === ""||director === ""||url === ""){
        ui.displayMessages("Please fill all fields.","danger");
    }else{
        const newMovie=new Movie(title,director,url);        
        ui.addMovieToUI(newMovie);
        storage.addMovieToStorage(newMovie);
        ui.displayMessages("Movie information successfully added","success");
    }
    ui.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}

function deleteMovie(e){
    
    if(e.target.id === 'delete-movie'){
        ui.deleteMovieFromUI(e.target);
        storage.deleteMovieFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Movie is deleted successfully","success");
    }
}

function clearAllMovies(){

    if(confirm('Are you sure you want to delete all movies from the list?')){        
        ui.clearAllMoviesFromUI();
        storage.clearAllMoviesFromStorage();
    }

}