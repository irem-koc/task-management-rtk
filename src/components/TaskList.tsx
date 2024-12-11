import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store"; // Import types
import { fetchTodo } from "../features/taskSlice";

type Props = {};

const TaskList = (props: Props) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <ul>
      {loading ? (
        <li>Loading...</li>
      ) : (
        <div className="mx-auto w-[1000px] p-5 border rounded-md bg-white">
          <h1 className="text-indigo-700 font-bold text-3xl text-center">
            Task Management App
          </h1>
          <p className="text-md text-start">Tasks</p>
          <div className="gap-4 flex flex-col justify-between items-center">
            {tasks.map((task) => (
              <li
                className="w-full rounded-md flex justify-between items-center bg-gray-50 p-5 "
                key={task?.id}
              >
                <span className="flex flex-col items-start">
                  <span className="font-bold text-wrap whitespace-nowrap">
                    {task.title}
                  </span>
                  <span>
                    Status: <span className="italic">{task.status}</span>
                  </span>
                </span>
                <span className="flex gap-3 items-center text-white">
                  <button className="rounded-md p-3 bg-blue-500">Edit</button>
                  <button className="rounded-md p-3 bg-red-500">Delete</button>
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
