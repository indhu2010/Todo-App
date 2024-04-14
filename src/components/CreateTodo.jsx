import React, { useState } from "react";
import TodoList from "./TodoList"; // Importing TodoList component
import swal from "sweetalert"; // Importing SweetAlert library for notifications

function CreateTodo() {
  // State to manage the input field value and whether the task is completed or not
  const [todo, setTodo] = useState({ title: "", done: false });
  // State to manage the array of todo items
  const [todoArr, setTodoArr] = useState([]);

  // Checking if there are todos saved in localStorage, if yes, retrieving them
  let todos = localStorage.hasOwnProperty("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  // Function to handle changes in the input field
  const onChange = (event) => {
    let { value } = event.target;
    let obj = {};
    obj["title"] = value;
    obj["done"] = false;
    setTodo(obj);
  };

  // Function to create a new todo item
  const createTodo = (event) => {
    const { name } = event.target;
    if (event.key === "Enter" || name === "addTodo") {
      if (todo.title !== "") {
        // Adding the new todo at the beginning of the array
        todos.unshift(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        // Resetting the input field value
        setTodo({ title: "", done: false });
      } else {
        // Showing an error message if the input field is empty
        swal("Oops", "Please write todo first", "error");
      }
    }
  };

  // Function to mark a todo item as completed
  const completeTodo = (i) => {
    if (todos[i]["done"] !== true) {
      todos[i]["done"] = true;
      localStorage.setItem("todos", JSON.stringify(todos));
      setTodoArr(todos);
      // Showing a success message after marking the todo as completed
      swal("Good job!", "Todo Completed", "success");
    }
  };

  // Function to delete a todo item
  const deleteTodo = (i) => {
    // Confirming with the user before deleting the todo item
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(res => {
      if (res) {
        // Deleting the todo item if the user confirms
        todos.splice(i, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        setTodoArr(todos);
      }
    });
  };

  return (
    <>
      <div className="box">
        <div className="text-end">
          <h2>React Todo App</h2>
          <h4> Add a new todo</h4>
        </div>
        <div className="text-addTodo">
          {/* Input field for adding new todos */}
          <input
            type="text"
            name="todo"
            placeholder="Write here..."
            value={todo.title}
            onKeyPress={createTodo}
            onChange={onChange}
          />
          {/* Button to add a new todo */}
          <button
            className="btn-addTodo"
            type="button"
            name="addTodo"
            onClick={createTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
      {/* Rendering TodoList component and passing props */}
      <TodoList
        todoArr={todoArr}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default CreateTodo;
