import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "100vh",
  },
}));

export default () => {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to={`/counter`}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to={`/virtual`}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Virtual" />
        </ListItem>
      </List>
    </Drawer>
  );
};
