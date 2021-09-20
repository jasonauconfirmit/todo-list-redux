import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTaskThunk,
  getTasksThunk,
  updateTaskThunk,
  selectTasks,
  deleteTaskThunk
} from "./tasksSlice";
import Task from "../Task";
import Search from "../Search";
import AddTask from "../AddTask";
import { useInitialMount } from "../../hooks";

import "./toDoList.css";

const ToDoList = () => {
  const [search, setSearch] = useState("");
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const initialMount = useInitialMount();

  console.log("tasks >>", tasks, tasks.length);

  useEffect(() => {
    if (initialMount) {
      dispatch(getTasksThunk());
    }
  }, [dispatch, initialMount]);

  const handleAdd = async (task) => dispatch(addTaskThunk(task));

  const handleToggleComplete = (task) => () => {
    const { id, name, complete } = task;
    dispatch(updateTaskThunk({ id, name, complete: !complete }));
  };

  const handleRename = (task) => async (name) => {
    const { id, complete } = task;
    dispatch(updateTaskThunk({ id, name, complete }));
  };

  const handleDelete = (taskId) => async () => {
    dispatch(deleteTaskThunk(taskId));
  };

  const handleSearch = (value) => {
    console.log("setting search value", value);
    setSearch(value);
  };

  const handleClear = () => {
    setSearch("");
  };

  const renderTask = (task) => (
    <Task
      key={task.id}
      name={task.name}
      complete={task.complete}
      onCheck={handleToggleComplete(task)}
      onRename={handleRename(task)}
      onDelete={handleDelete(task.id)}
      description={task.description}
    />
  );

  const renderTasks = () => {
    if (search) {
      return tasks
        .filter(
          (task) =>
            task.name.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search)
        )
        .map(renderTask);
    } else {
      return tasks.map(renderTask);
    }
  };

  return (
    <div>
      <Search search={search} onSearch={handleSearch} onClear={handleClear} />
      <AddTask onAdd={handleAdd} />
      <div className={"toDoList"}>
        {tasks.length > 0 ? renderTasks() : <div>No Tasks?</div>}
      </div>
    </div>
  );
};

export default ToDoList;
