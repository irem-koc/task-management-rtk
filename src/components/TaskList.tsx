import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store"; // Import types
import { deleteTask, fetchTodo } from "../features/taskSlice";
import EditTaskModal from "./EditTaskModal";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);
  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };
  return (
    <ul>
      {loading ? (
        <li>Loading...</li>
      ) : (
        <div>
          <p className="text-md text-start mt-2 ">Tasks</p>
          <div className="gap-4 flex flex-col justify-between items-center">
            {tasks.map((task: Task) => (
              <li
                className="w-full rounded-md flex justify-between items-center bg-gray-50 p-5 "
                key={task?.id}
              >
                <span className="flex flex-col items-start">
                  <span className="font-bold text-wrap whitespace-nowrap">
                    {task.title}
                  </span>
                  <span className="italic text-gray-400">
                    {task.description}
                  </span>
                  <span>
                    Status:{" "}
                    <span className="italic underline">{task.status}</span>
                  </span>
                </span>
                <span className="flex gap-3 items-center text-white">
                  <EditTaskModal editedTask={task} />
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="rounded-md p-3 bg-red-500"
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </div>
        </div>
      )}
    </ul>
  );
};

export default TaskList;
