import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="h-screen bg-gray-100 pt-10">
      <div className="mx-auto w-[1000px] p-5 border rounded-md bg-white">
        <h1 className="text-indigo-700 font-bold text-3xl text-center">
          Task Management App
        </h1>
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
