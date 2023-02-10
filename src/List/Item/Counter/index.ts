import { Component, useState } from "../../../lib";

type Props = {
  index: number;
};

const Counter: Component<Props> = ({ index }) => {
  const [getCount, setCount] = useState(index.toString())(0);

  const decrement = (): void => {
    setCount(getCount() - 1);
  };

  const increment = (): void => {
    setCount(getCount() + 1);
  };

  return {
    tag: "div",
    className: "item flex",
    children: [
      {
        tag: "button",
        className: "button",
        children: "-",
        events: {
          onClick: decrement,
        },
      },
      {
        tag: "div",
        children: getCount().toString(),
        events: {},
      },
      {
        tag: "button",
        className: "button",
        children: "+",
        events: {
          onClick: increment,
        },
      },
    ],
    events: {},
  };
};

export default Counter;
