import React, { useState, useEffect, useReducer, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodoItems,
  getTodoItems,
  getTodoItemsFromNetwork,
  updateTodoStatus,
} from "./homeSlice";
import homeReducer from "./homeSlice";
import {
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";
import TodoItem from "./TodoItem";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default () => {
  const todoItems = useSelector(selectTodoItems);
  const dispatch = useDispatch();
  //const [items, setItems] = useState(todoItems);
  //const [state, dispatch] = useReducer(homeReducer, todoItems);

  useEffect(() => {
    console.log("didMount");
    dispatch(getTodoItemsFromNetwork());
  }, []);

  if (todoItems && !isEmpty(todoItems)) {
    console.log("render TodoList");
    const listItems = todoItems.map((todo, index) => {
      return <TodoItem key={todo.id} />;
    });

    return <List>{listItems}</List>;
  } else {
    console.log("render CircularProgress");
    return <CircularProgress />;
  }
};
