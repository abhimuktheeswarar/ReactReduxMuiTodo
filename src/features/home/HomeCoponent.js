import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loading, getTodoItemsFromNetwork } from "./homeSlice";
import InLineTodoCreator from "./InLineTodoCreator";
import TodoList from "./TodoList";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    //backgroundColor: "#FF0000",
  },
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  inLineTodoCreator: {
    display: "flex",
    width: "50%",
    backgroundColor: "#FF0000",
    marginLeft: "25%",
  },
  paperTodoList: {
    marginTop: theme.spacing(4),
    width: "100%",
    height: "70vh",
  },
}));

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("didMount");
    dispatch(getTodoItemsFromNetwork());
  }, []);

  const isLoading = useSelector(loading);
  const classes = useStyles();

  console.log("render HomeCoponent");

  let children;
  if (isLoading === undefined || isLoading === true) {
    children = (
      <Container className={classes.progressContainer}>
        <CircularProgress />
      </Container>
    );
  } else {
    children = (
      <Paper className={classes.paperTodoList}>
        <TodoList />
      </Paper>
    );
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <InLineTodoCreator />
      {children}
    </Container>
  );
};
