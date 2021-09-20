import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { isTaskValid } from "./util";

var mock = new MockAdapter(axios, { delayResponse: 1000 });

let tasksDb = [
  {
    id: 1,
    name: "John Smith",
    description:
      "This is my name and it's really long yah yah yah yah yah yah yah yah yah",
    complete: false,
    deleted: false
  }
];
let autoincrement = tasksDb.length + 1;

mock.onGet("/tasks").reply(200, tasksDb);

mock.onPost("/tasks").reply((config) => {
  const body = JSON.parse(config.data);
  console.log("body", body);
  if (isTaskValid(body, ["name", "description"])) {
    const newTask = {
      id: autoincrement++,
      name: body.name,
      description: body.description || "",
      complete: false
    };
    tasksDb.push(newTask);
    return [200, newTask];
  } else {
    return [400, "Bad request"];
  }
});

mock.onPut(/\/tasks\/\d+/).reply((config) => {
  console.log("db >> updateTasks", config.url);
  const taskId = config.url.split("/")[1] || "";
  const body = JSON.parse(config.data);

  if (isTaskValid(body, ["id", "name", "description", "complete"])) {
    const taskIndex = tasksDb.findIndex((task) => taskId === task.id);
    tasksDb[taskIndex] = body;

    return [200, body];
  }

  return [400, "Bad request"];
});

mock.onDelete(/\/tasks\/\d+/).reply((config) => {
  const taskId = config.url.split("/")[2] || "";

  const taskIndex = tasksDb.findIndex((task) => Number(taskId) === task.id);
  if (taskIndex >= 0) {
    tasksDb = tasksDb.splice(taskIndex, 1);
    return [204];
  }

  return [400, "Bad request"];
});
