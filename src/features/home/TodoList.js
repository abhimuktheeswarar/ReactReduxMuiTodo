import React from "react";
import { useSelector } from "react-redux";
import { ListItem, ListItemText } from "@material-ui/core";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { selectTodoItems } from "./homeSlice";
import { isEmpty } from "lodash";
import TodoItem from "./TodoItem";
import { CellMeasurer, CellMeasurerCache } from "react-virtualized";

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});
export default (props) => {
  const todoItems = useSelector(selectTodoItems);

  if (todoItems && !isEmpty(todoItems)) {
    console.log("render TodoList");

    const rowRenderer = ({ index, isScrolling, key, parent, style }) => {
      const todo = todoItems[index];

      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {({ measure, registerChild }) => (
            <TodoItem
              ref={registerChild}
              key={todo.id}
              style={style}
              todo={todo}
              index={index}
              length={todoItems.length}
            />
          )}
        </CellMeasurer>
      );
    };

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={todoItems.length}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            width={width}
            deferredMeasurementCache={cache}
          />
        )}
      </AutoSizer>
    );
  } else {
    return null;
  }
};
