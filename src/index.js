import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./server/mock";

import App from "./client/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
