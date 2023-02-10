import { Component } from "../../lib";
import Counter from "./Counter";

type Props = {
  index: number;
  onDelete(): void;
};

const Item: Component<Props> = ({ index, onDelete }) => {
  return {
    tag: "div",
    className: "item flex",
    children: [
      {
        tag: "div",
        children: [Counter({ index })],
        events: {},
      },
      {
        tag: "button",
        className: "button",
        children: "delete",
        events: {
          onClick: onDelete,
        },
      },
    ],
    events: {},
  };
};

export default Item;
