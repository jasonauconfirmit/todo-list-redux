import React, { useState, useEffect, useRef } from "react";
import "./task.css";

const Task = ({ name, complete, onCheck, onRename, onDelete, description }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);
  const inputRef = useRef(null);
  const handleSetIsEditing = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => setValue(e.target.value);
  const handleSubmit = () => {
    setIsEditing(false);
    if (value !== name) onRename(value);
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  return (
    <div className="task">
      <div className="task__controls">
        <input
          type="checkbox"
          className="task__checkbox"
          checked={complete}
          onChange={onCheck}
        />
        <input
          value={value}
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyPress={handleKeypress}
          hidden={!isEditing}
          ref={inputRef}
        />
        <div>
          <div
            onClick={handleSetIsEditing}
            hidden={isEditing}
            className={`task__title ${complete && "task__title--complete"}`}
          >
            {name}
          </div>
          <div className={"task__description"}>{description}</div>
        </div>
      </div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Task;
