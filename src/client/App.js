import "./styles.css";
import "./mocks/client";
import Task from "./Components/task";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Task />
    </div>
  );
}
