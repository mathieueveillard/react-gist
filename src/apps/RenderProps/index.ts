import { Component, VirtualDomElement } from "../../lib";

type Props = {
  render(n: number): VirtualDomElement;
};

const Container: Component<Props> = ({ render }) => {
  return {
    tag: "div",
    children: [render(0)],
    events: {},
  };
};

const App: Component<{}> = () => {
  return Container({
    render: (n) => ({
      tag: "div",
      children: n.toString(),
      events: {},
    }),
  });
};

export default App;
