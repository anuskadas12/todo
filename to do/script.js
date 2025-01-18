// Initializing empty array of todos that will be rendered in the webpage
let todos = [];

// Getting the Todo List <ul> from the HTML
let todoList_UL = document.getElementById("todo-list");

// Getting the "Add Task" button
let addButton = document.querySelector("#add-task-btn");

// Getting the user input and storing it in 'newTodo' variable
let newTodo = document.querySelector("#todo-input");

// Function to render the Todos
const loadTodo = () => {
  // Clear the existing todos from the list before re-rendering
  todoList_UL.innerHTML = "";

  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  } else {
    todos = [];
  }

  // Using map function to display todos
  todos.map((todo) => {
    let singleTodo_LI = document.createElement("li"); //<li>
    todoList_UL.appendChild(singleTodo_LI); // <ul> <li> </li></ul>

    let todoTask_span = document.createElement("span"); //<span> </span>
    todoTask_span.textContent = todo.task; //<span> todo.task </span>
    singleTodo_LI.appendChild(todoTask_span); // <li><span> todo.task </span> </li>

    // Create and append the "Remove" button
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-id", todo.id); // Add the todo ID to button
    removeButton.addEventListener("click", removeTodo); // Add event listener
    singleTodo_LI.appendChild(removeButton);
  });
};

// Function to add the Todo
const addTodo = () => {
  // Trimming the todo value
  let newTodoValue = newTodo.value.trim();

  // New todo object to be added to the array
  let newTodoObject; //{}

  if (newTodoValue) {
    newTodoObject = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      task: newTodoValue,
      completed: false, // Completed is false initially
    };
    todos.push(newTodoObject); // Push the new todo to the array

    // Create and append the new todo in the DOM
    let newTodoElement = document.createElement("li");

    let todoTask = document.createElement("span");
    todoTask.textContent = newTodoObject.task;
    newTodoElement.appendChild(todoTask); // Append task to newTodoElement

    // Create and append the "Remove" button
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-id", newTodoObject.id); // Add the todo ID to button
    removeButton.addEventListener("click", removeTodo); // Add event listener
    newTodoElement.appendChild(removeButton);

    // Append the new todo element to the actual list
    todoList_UL.appendChild(newTodoElement);

    // Save the updated todos array to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    // Clear the input field
    newTodo.value = "";
  }
};

// Function to remove the Todo
const removeTodo = (event) => {
  const id = parseInt(event.target.getAttribute("data-id")); // Get todo ID from button
  todos = todos.filter((todo) => todo.id !== id); // Filter out the removed todo

  // Save updated todos array to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));

  // Re-render the list
  loadTodo();
};

// Load todos from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadTodo();

  // Add event listener for adding a new todo
  addButton.addEventListener("click", addTodo);
});