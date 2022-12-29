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
};
function addTodo(e){
    // trim() : erasing the space if user enter a value with a space in the beginning 
    const newTodo = todoInput.value.trim();
    
    if (newTodo === ""){
        showAlert("danger", "Please enter a task!");
    } else{
        // to enter the new to do on to the list as  dynamic element
        addTodoUI(newTodo);
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