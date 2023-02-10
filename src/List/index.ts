import { Component, useState } from "../lib";
import Item from "./Item";

const List: Component<{}> = () => {
  const [getItems, setItems] = useState("List")([1, 2, 3]);

  const items = getItems();

  const addItem = (): void => {
    const maxItem = items[items.length - 1] || 0;
    setItems([...items, maxItem + 1]);
  };

  const deleteItem = (index: number) => (): void => {
    const nextItems = [...items];
    nextItems.splice(index, 1);
    setItems(nextItems);
  };

  return {
    tag: "div",
    children: [
      {
        tag: "button",
        className: "button",
        children: "Click here to add an item",
        events: {
          onClick: addItem,
        },
      },
      {
        tag: "div",
        children: items.map((n, index) =>
          Item({
            index: n,
            onDelete: deleteItem(index),
          })
        ),
        events: {},
      },
    ],
    events: {},
  };
};

export default List;
