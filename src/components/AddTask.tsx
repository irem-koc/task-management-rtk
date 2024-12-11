import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { AppDispatch } from "../features/store";
import { addTask } from "../features/taskSlice";

const AddTask = () => {
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      ...task,
      id: v4(),
    };
    dispatch(addTask(newTask));
    setTask({
      id: "",
      title: "",
      description: "",
      status: "",
    });
  };

  return (
    <div>
      <h1 className="text-indigo-700 mb-4 text-xl text-start items-start">
        Add New Task
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-6">
          <input
            name="title"
            required
            className="border outline-none p-3 rounded-md"
            type="text"
            placeholder="Task Title"
            onChange={handleChange}
            value={task.title}
          />
          <textarea
            name="description"
            required
            className="border outline-none p-3 rounded-md"
            placeholder="Task Description"
            onChange={handleChange}
            value={task.description}
          />
          <select
            required
            className="border outline-none p-3 rounded-md"
            name="status"
            id="status"
            onChange={handleChange}
            value={task.status}
          >
            <option hidden disabled value="">
              Select Status
            </option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            type="submit"
            className="text-white rounded-md p-3 bg-indigo-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
