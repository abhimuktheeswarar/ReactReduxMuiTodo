import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBarComponent from "../common/appbar/AppBarComponent";
import SideBar from "../common/sidebar/SideBar";
import HomeComponent from "../features/home/HomeCoponent";
import { Counter } from "../features/counter/Counter";
import VirtualList from "../features/sample/VirtualList";
import history from "./history";
import SignIn from "../features/signin/SignIn";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBarComponent />
      <Hidden smDown>
        <SideBar />
      </Hidden>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/counter" component={Counter} />
        <Route exact path="/virtual" component={VirtualList} />
      </main>
    </div>
  );
};

export default () => {
  const classes = useStyles();

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/signIn" component={SignIn} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
};
