import axios from "axios";

const getTasks = async () => {
  const tasks = await axios.get("/tasks");

  return tasks;
};

const addTask = async (name, description) => {
  const task = await axios.post("/tasks", { name, description });

  return task;
};

const updateTask = async (task) => {
  const response = await axios.put(`/tasks/${task.id}`, task);
  return response;
};

const deleteTask = async (taskId) => {
  const response = await axios.delete(`/tasks/${taskId}`);
  console.log("deleted task", response);

  return response;
};

export { getTasks, addTask, deleteTask, updateTask };
