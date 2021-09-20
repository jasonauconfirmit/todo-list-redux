import MockAdapter from "axios-mock-adapter";
import axios from "axios";

var mock = new MockAdapter(axios, { delayResponse: 1000 });

mock.onGet("/list").reply(200, {
  users: [{ id: 1, name: "John Smith" }]
});

mock.onGet(/\/product\/[a-zA-Z]+/).reply((config) => {
  console.log("config.url", config.url);
  const name = config.url.split("/")[1] || "";

  return [
    200,
    {
      name,
      price: name.charCodeAt(0) / 100
    }
  ];
});
