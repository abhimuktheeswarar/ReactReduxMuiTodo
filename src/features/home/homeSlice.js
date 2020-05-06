import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getTodoItemsFromNetwork = createAsyncThunk(
  "todos/getTodoItemsFromNetwork",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response.data;
  }
);

export const todosAdapter = createEntityAdapter({
  loading: false,
});
const initialState = todosAdapter.getInitialState();

export const homeSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateTodoStatus: (state, { payload }) => {
      const { id, ...changes } = payload;
      todosAdapter.updateOne(state, { id, changes });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodoItemsFromNetwork.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTodoItemsFromNetwork.fulfilled, (state, action) => {
      todosAdapter.upsertMany(state, action.payload);
      state.loading = false;
    });
  },
});

export const { getTodoItems, updateTodoStatus } = homeSlice.actions;

export const loading = (state) => state.todos.loading;

export const { selectAll: selectTodoItems } = todosAdapter.getSelectors(
  (state) => state.todos
);

export default homeSlice.reducer;
