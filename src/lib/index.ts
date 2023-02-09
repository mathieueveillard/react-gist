type VirtualDomEvents = {
  onClick?: () => void;
};

export type VirtualDomElement = {
  tag: "div";
  children: string | VirtualDomElement[];
  events: VirtualDomEvents;
};

const createElement = (tag: "div"): HTMLElement => {
  return document.createElement(tag);
};

const bindEvents =
  ({ onClick }: VirtualDomEvents) =>
  (domElement: HTMLElement): void => {
    if (onClick) {
      domElement.onclick = onClick;
    }
  };

const setText =
  (text: string) =>
  (domElement: HTMLElement): void => {
    domElement.innerText = text;
  };

const appendTo =
  (parent: HTMLElement) =>
  (child: HTMLElement): void => {
    parent.appendChild(child);
  };

const interpret = ({ tag, children, events }: VirtualDomElement): HTMLElement => {
  const domElement = createElement(tag);

  bindEvents(events)(domElement);

  if (typeof children === "string") {
    setText(children)(domElement);
    return domElement;
  }

  children.map(interpret).forEach(appendTo(domElement));
  return domElement;
};

const bootstrap = (app: VirtualDomElement): void => {
  const root = document.getElementById("root");
  const domElement = interpret(app);
  root?.appendChild(domElement);
};

export default bootstrap;
