import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { CssBaseline, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBarComponent from "../common/appbar/AppBarComponent";
import SideBar from "../common/sidebar/SideBar";
import HomeComponent from "../features/home/HomeCoponent";
import { Counter } from "../features/counter/Counter";
import VirtualList from "../features/sample/VirtualList";
import history from "./history";

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

const Base = () => {
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
        <HomeComponent />
      </main>
    </div>
  );
};

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router history={history}>
        <CssBaseline />
        <AppBarComponent />
        <Hidden smDown>
          <SideBar />
        </Hidden>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/counter" component={Counter} />
            <Route exact path="/virtual" component={VirtualList} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};
