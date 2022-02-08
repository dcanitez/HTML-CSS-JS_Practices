//Selecting Form inputs which will create todo List
const form=document.querySelector('#todo-form');
const todoInput=document.querySelector('#todo');
const todoDue=document.querySelector('#dueDate');
//Selecting List Elements to push todo data
const todoList=document.querySelector('.list-group');
//Selecting card-footer to add an alert text when you add a todo to list
const alertMessage=document.querySelector('#messageArea');
//Selecting second card body
const secondCardBody=document.querySelectorAll('.card-body')[1];
//Selecting filter area and clear all button
const filter=document.querySelector('#filter');
const clearBtn=document.querySelector('#clear-todos');

eventListeners();
//All event Listeners
function eventListeners(){
    form.addEventListener("submit",addToDo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener('click',deleteTodo);
    filter.addEventListener('keyup',filterTodos);
    clearBtn.addEventListener('click',clearAllTodos);
}

function clearAllTodos(){
    if(confirm("All todos will be deleted.\nAre you sure to delete them all?")){
        // todoList.innerHTML="";
        while(todoList.firstElementChild!=null){
            todoList.removeChild(todoList.firstElementChild);
        }        
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
            listItem.setAttribute("style","display:none!important;");
        }else{
            listItem.setAttribute("style","display:block;");
        }

    });
}

function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        let childs=e.target.parentElement.previousSibling.childNodes;
        e.target.parentElement.parentElement.remove();
        showAlert("success","Successfully removed from the list");
        
        deleteTodoFromStorage(childs[0].textContent,childs[1].textContent);
    }
}

function deleteTodoFromStorage(todoItem,todoDate){
    let todos=getTodosFromStorage();   
    todos.forEach(function(todo,index){
        if(todo[0]==todoItem && todo[1]==todoDate){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();    
    todos.forEach(function(todo){
        addTodoToUI(todo[0],todo[1]);
    });
}


function addToDo(e){
    let ToDoString=todoInput.value.trim();
    var newDate=todoDue.value;    
    if(newDate===""){
        let today=new Date();
        let day=today.getDate();
        let month=today.getMonth()+1;
        let year=today.getFullYear();
        newDate=`${year}-${month}-${day}`;
    }    
    let newToDo=[ToDoString,newDate];
    if(ToDoString===""){        
        showAlert("danger","ToDo area cannot be empty.");
    }else{
        addTodoToUI(ToDoString,newDate);
        addTodoToLocalStorage(newToDo);
        showAlert("success","Successfully added to list.")
    }    
    e.preventDefault();
}

function addTodoToUI(ToDoString,newDate){
    const listItem=document.createElement("li");
    listItem.className="list-group-item d-flex justify-content-between"
    const itemSpan=document.createElement("span");
    const dateSpan=document.createElement("span");
    dateSpan.className="badge rounded-pill bg-info text-dark ms-4";    
    dateSpan.innerText=newDate;
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class='fa fa-remove'></i>";
    itemSpan.appendChild(document.createTextNode(ToDoString));
    itemSpan.appendChild(dateSpan);
    listItem.appendChild(itemSpan);
    listItem.appendChild(link);
    todoList.appendChild(listItem);
}

function showAlert(type,message){
  const alert=document.createElement('div');
  alert.className=`alert alert-${type}`;
  alert.setAttribute("role","alert");
  alert.textContent=message;
  alertMessage.append(alert);

  //setTimeout
  window.setTimeout(function(){
    alert.remove();
  },1000);
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToLocalStorage(newToDo){
    let todos=getTodosFromStorage();

    todos.push(newToDo);
    localStorage.setItem("todos",JSON.stringify(todos));
}








