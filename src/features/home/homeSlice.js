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
  sortComparer: (a, b) => b.id - a.id,
});
const initialState = todosAdapter.getInitialState();

export const homeSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      const id = state.ids.length + 1;
      const todo = { id, userId: 1, completed: false, ...payload };
      todosAdapter.addOne(state, todo);
    },
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

export const { getTodoItems, updateTodoStatus, addTodo } = homeSlice.actions;

export const loading = (state) => state.todos.loading;

export const { selectAll: selectTodoItems } = todosAdapter.getSelectors(
  (state) => state.todos
);

export default homeSlice.reducer;
