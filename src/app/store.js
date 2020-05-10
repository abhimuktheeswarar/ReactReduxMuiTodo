import { configureStore } from "@reduxjs/toolkit";
import history from "./history";
import counterReducer from "../features/counter/counterSlice";
import todoItemsReducer from "../features/home/homeSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoItemsReducer,
  },
});
