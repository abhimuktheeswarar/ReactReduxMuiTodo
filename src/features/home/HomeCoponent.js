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
import TodoList from "./TodoList";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default () => {
  const classes = useStyles();

  console.log("render HomeCoponent");
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper>
        <TodoList />
      </Paper>
    </Container>
  );
};
