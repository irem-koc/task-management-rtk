export const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const result = await response.json();
  return result.map((task: Task) => ({
    id: task.id,
    title: task.title,
    description: "",
    status: task.completed ? "Completed" : "Not Completed",
  }));
};
