import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <AppBar position="fixed" className={classes.appBar} aria-label="menu">
      <Toolbar>
        <Typography component="h1" variant="h6" className={classes.title}>
          Todos
        </Typography>
        <Button color="inherit" component={Link} to="/signIn">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};
