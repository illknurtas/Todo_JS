// Selecting all the elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

// all event listeners
eventListener();
function eventListener(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearTodos);
};
function addTodo(e){
    // trim() : erasing the space if user enter a value with a space in the beginning 
    const newTodo = todoInput.value.trim();
    
    if (newTodo === ""){
        showAlert("danger", "Please enter a task!");
    } else{
        // to enter the new to do on to the list as  dynamic element
        addTodoUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success", "New task added successfully!");
    }

    e.preventDefault(); // form tekrardan sayfaya yönlenmesin diye bir önlem kodu
}


// This function is going to add the string value into the UI as list item
function addTodoUI(newTodo){

    // creating list item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    // creatink link
    const link = document.createElement("a");
    link.href = "#";
    link.className ="delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    // adding text node 
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // adding an item into the to do list
    todoList.appendChild(listItem);

    // to clean the input's inside we can use
    todoInput.value = "";

    console.log(listItem);
}

// to prevent adding the empty to do input into the list
function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // to show the alert under the task input area
    firstCardBody.appendChild(alert);

    // after display the alert, to make it disappear from screen
    // setTimeout
    setTimeout(function(){
        alert.remove();
    },3000); // it will last 3 seconds
    
}

// to get all to do's from storage
function getTodoFromStorage(){
    let todos;
    if (localStorage.getItem('todos')=== null){
        todos =[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

// To add the tasks into the local storage
function addTodoStorage(newTodo){
    let todos = getTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));   
}


// Loading the tasks everytime, that previously stored in local storage 
function loadAllTodosToUI(){
    let todos = getTodoFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}

// Deleting the tasks from form and local storage
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoStorage(e.target.parentElement.parentElement.textContent);
        showAlert("info","Task deleted successfully!");
    }
}
function deleteTodoStorage(delettodo){
    let todos = getTodoFromStorage();
    todos.forEach(function(todo,index){
        if (todo === delettodo) {
            todos.splice(index,1);
        }});
    localStorage.setItem("todos",JSON.stringify(todos));
}
// To filter tasks
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            // When it doesn't find
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style", "display : block");
        }
    });
}

// To clear all tasks
function clearTodos(e){
    if (confirm("Are you sure delete all tasks?")){
        // todoList.innerHTML = ""; //slow and not so usefull for bigger projects
        // faster than innerHTML
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}