import React from "react";
import axios from "axios";

const Task = () => {
  axios.get("/product/Lettuce").then((res) => console.log(res.data));
  axios.get("/list").then((res) => console.log(res.data));

  return (
    <div
      onClick={() => axios.get("/list").then((res) => console.log(res.data))}
    >
      Task
    </div>
  );
};

export default Task;
