import React, { useState } from "react";
import "./addTask.css";

const AddTask = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleAdd = () => {
    onAdd({ name, description });
  };

  return (
    <div className="addTask">
      <div>
        <label className="addTask__label" htmlFor="addTaskTitle">
          Title
        </label>
        <input id="addTaskTitle" value={name} onChange={handleChangeName} />
      </div>
      <div>
        <label className="addTask__label" htmlFor="addTaskDesc">
          Description
        </label>
        <input
          id="addTaskDesc"
          value={description}
          onChange={handleChangeDescription}
        />
      </div>

      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default AddTask;
