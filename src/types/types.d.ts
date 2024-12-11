interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  completed?: boolean;
}
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  status: "All" | "Completed" | "Not Completed";
}
interface EditTaskModalProps {
  editedTask: Task;
}
