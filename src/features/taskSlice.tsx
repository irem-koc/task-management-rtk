import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  status: "All",
};

export const fetchTodo = createAsyncThunk<Task[], void>(
  "tasks/fetchTodo",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const result = await response.json();
    return result.map((task: Task) => ({
      id: task.id,
      title: task.title,
      description: "",
      status: task.completed ? "Completed" : "Not Completed",
    }));
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
