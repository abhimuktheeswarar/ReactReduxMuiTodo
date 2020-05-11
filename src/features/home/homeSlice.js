import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getTodoItemsFromNetwork = createAsyncThunk(
  "todos/getTodoItemsFromNetwork",
  async (thunkAPI) => {
    const response = await axios.get("http://localhost:3001/todos");
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const o = getState().todos.ids.length == 0;
      console.log(`o = ${o}`);
      return o;
    },
    dispatchConditionRejection: true,
  }
);

export const addTodoItem = createAsyncThunk(
  "todos/addTodoItem",
  async (todo, thunkAPI) => {
    const userId = 13;
    const response = await axios.post("http://localhost:3001/todos", {
      ...todo,
      userId,
      completed: false,
    });
    return response.data;
  }
);

export const updateTodoItemStatus = createAsyncThunk(
  "todos/updateTodoItemStatus",
  async (todo, thunkAPI) => {
    const { id } = todo;
    const response = await axios.patch(
      `http://localhost:3001/todos/${id}`,
      todo
    );
    return response.data;
  }
);

export const deleteTodoItem = createAsyncThunk(
  "todos/deleteTodoItem",
  async (id, thunkAPI) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    return id;
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodoItem.fulfilled, (state, action) => {
      todosAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateTodoItemStatus.fulfilled, (state, { payload }) => {
      const { id, ...changes } = payload;
      todosAdapter.updateOne(state, { id, changes });
    });
    builder.addCase(getTodoItemsFromNetwork.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTodoItemsFromNetwork.fulfilled, (state, action) => {
      todosAdapter.upsertMany(state, action.payload);
      state.loading = false;
    });
    builder.addCase(deleteTodoItem.fulfilled, (state, action) => {
      todosAdapter.removeOne(state, action.payload);
    });
  },
});

export const { getTodoItems, updateTodoStatus, addTodo } = homeSlice.actions;

export const loading = (state) => state.todos.loading;

export const { selectAll: selectTodoItems } = todosAdapter.getSelectors(
  (state) => state.todos
);

export default homeSlice.reducer;
