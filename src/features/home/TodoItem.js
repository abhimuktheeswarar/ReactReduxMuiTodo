import React, { Fragment, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { updateTodoItemStatus, deleteTodoItem } from "./homeSlice";
import {
  Checkbox,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialog from "../../common/dialog/Dialogs";

export default memo((props) => {
  const todo = props.todo;
  const key = todo.id;
  const index = props.index;
  const length = props.length;

  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const id = event.target.id;
    const checked = event.target.checked;

    dispatch(updateTodoItemStatus({ id, completed: checked }));
  };

  const [
    showDeleteConfirmationDialog,
    setShowDeleteConfirmationDialog,
  ] = useState(false);

  const onClickPositive = (id) => {
    setShowDeleteConfirmationDialog(false);
    dispatch(deleteTodoItem(id));
  };

  const onClickNegative = () => {
    setShowDeleteConfirmationDialog(false);
  };

  const onClickDelete = (id) => {
    setShowDeleteConfirmationDialog(true);
    console.log(`id = ${id}`);
  };

  console.log("render TodoItem");

  const textStyle = todo.completed ? { textDecoration: "line-through" } : {};
  return (
    <div ref={props.registerChild} key={todo.id} style={props.style}>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            id={String(todo.id)}
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
        </ListItemIcon>
        <ListItemText primary={todo.title} style={textStyle} />
        <Fragment>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              id={todo.id}
              onClick={() => {
                onClickDelete(todo.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </Fragment>
      </ListItem>

      <AlertDialog
        id={todo.id}
        show={showDeleteConfirmationDialog}
        title="Are you sure?"
        onClickPositive={onClickPositive}
        onClickNegative={onClickNegative}
      />
      {(() => {
        if (index !== length - 1) {
          return <Divider key={`div${todo.id}`} />;
        }
      })()}
    </div>
  );
});
