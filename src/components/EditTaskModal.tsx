import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { editTask } from "../features/taskSlice";

const EditTaskModal = ({ editedTask }: EditTaskModalProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [task, setTask] = useState({
    id: editedTask.id,
    title: editedTask.title,
    description: editedTask.description,
    status: editedTask.status,
  });
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editTask(task));
    setIsEditModalOpen(false);
  };
  const handleEditTask = () => {
    setIsEditModalOpen(true);
  };
  return !isEditModalOpen ? (
    <button onClick={handleEditTask} className="rounded-md p-3 bg-blue-500">
      Edit
    </button>
  ) : (
    <div className="absolute z-10 bg-white text-black p-4 border rounded-md shadow-lg">
      <h1 className="text-indigo-700 mb-4 text-xl text-start items-start">
        Edit Task
      </h1>
      <form onSubmit={handleEditSubmit}>
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="text-white rounded-md p-3 bg-indigo-700"
            >
              Edit Task
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              type="submit"
              className="text-white rounded-md p-3 bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTaskModal;
