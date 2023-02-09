import bootstrap, { VirtualDomElement } from "./lib";

const app: VirtualDomElement = {
  tag: "div",
  children: [
    {
      tag: "div",
      children: "Click me to display an alert window!",
      events: {
        onClick: () => {
          alert("😎");
        },
      },
    },
    {
      tag: "div",
      children: "Lorem ipsum",
      events: {},
    },
  ],
  events: {},
};

bootstrap(app);
