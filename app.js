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
    // to enter the new to do on to the list as  dynamic element
    addTodoUI(newTodo);


    // inputa girilen veriyi console kısmına yazdırmak için olan bir kod
    // console.log(newTodo);

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