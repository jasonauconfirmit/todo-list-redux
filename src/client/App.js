import React from "react";
import ToDoList from "./components/ToDoList";
import store from "./store";
import { Provider } from "react-redux";
import "./styles.css";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>To Do List</h1>
        <h2>See Readme for instructions</h2>
        <ToDoList />
      </div>
    </Provider>
  );
}
