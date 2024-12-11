import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { tasks: [], loading: false, error: null, status: "All" };

export const fetchTodo = createAsyncThunk("tasks/fetchTodo", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?limit=10"
  );
  const result = await response.json(); // Make sure to wait for the JSON to be parsed
  return result.map((task) => ({
    id: task.id,
    title: task.title,
    description: "",
    status: task.completed ? "Completed" : "Not Completed",
  }));
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
