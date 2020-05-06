import React from "react";
import { CssBaseline, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBarComponent from "../common/appbar/AppBarComponent";
import SideBar from "../common/sidebar/SideBar";
import HomeComponent from "../features/home/HomeCoponent";

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

export default () => {
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
