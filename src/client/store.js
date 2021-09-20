import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./components/ToDoList/tasksSlice";

export default configureStore({
  reducer: {
    tasks: tasksReducer
  }
});
