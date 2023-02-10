import bootstrap, { Component } from "./lib";

type Props = {
  text: string;
};

const Item: Component<Props> = ({ text }) => {
  return {
    tag: "div",
    className: "item",
    children: text,
    events: {
      onClick: () => {
        alert(text);
      },
    },
  };
};

const List: Component<{}> = () => {
  const items = ["First", "Second", "Third"];
  return {
    tag: "div",
    children: items.map((text) => Item({ text })),
    events: {},
  };
};

bootstrap(List);
