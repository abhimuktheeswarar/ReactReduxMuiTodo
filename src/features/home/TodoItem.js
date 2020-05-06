import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  Fragment,
  memo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodoItems,
  getTodoItems,
  getTodoItemsFromNetwork,
  updateTodoStatus,
} from "./homeSlice";
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

  //const [index, setIndex] = useState(props.index);
  //const [todo, setTodo] = useState(props.todo);

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
