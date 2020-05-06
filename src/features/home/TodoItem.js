import React, { Fragment, memo } from "react";
import { useDispatch } from "react-redux";
import { updateTodoStatus } from "./homeSlice";
import {
  Checkbox,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

export default memo((props) => {
  const todo = props.todo;
  const index = props.index;
  const length = props.length;

  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const id = event.target.id;
    const checked = event.target.checked;

    dispatch(updateTodoStatus({ id, completed: checked }));
  };

  console.log("render TodoItem");

  const style = todo.completed ? { textDecoration: "line-through" } : {};
  return (
    <Fragment>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            id={String(todo.id)}
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
        </ListItemIcon>
        <ListItemText primary={todo.title} style={style} />
      </ListItem>
      {(() => {
        if (index !== length - 1) {
          return <Divider key={`div${todo.id}`} />;
        }
      })()}
    </Fragment>
  );
});
