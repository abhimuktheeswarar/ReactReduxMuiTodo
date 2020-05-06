import React from "react";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { selectTodoItems } from "./homeSlice";
import { isEmpty } from "lodash";
import TodoItem from "./TodoItem";

export default (props) => {
  const todoItems = useSelector(selectTodoItems);

  if (todoItems && !isEmpty(todoItems)) {
    console.log("render TodoList");
    const listItems = todoItems.map((todo, index) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          length={todoItems.length}
        />
      );
    });

    const renderRow = (props) => {
      const { index } = props;
      const todo = todoItems[index];
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          length={todoItems.length}
        />
      );
    };

    return <List>{listItems}</List>;
  } else {
    return null;
  }
};
