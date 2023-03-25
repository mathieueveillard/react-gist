type VirtualDomEvents = {
  onClick?: () => void;
};

type Tag = "div" | "button";

export type VirtualDomElement = {
  tag: Tag;
  className?: string;
  children: string | VirtualDomElement[];
  events: VirtualDomEvents;
};

export type Component<Props extends {}> = (props: Props) => VirtualDomElement;

let render: () => void;

const createElement = (tag: Tag): HTMLElement => {
  return document.createElement(tag);
};

const addClassName =
  (className: string) =>
  (domElement: HTMLElement): void => {
    domElement.className = className;
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

const interpret = ({ tag, className = "", children, events }: VirtualDomElement): HTMLElement => {
  const domElement = createElement(tag);
  addClassName(className)(domElement);
  bindEvents(events)(domElement);

  if (typeof children === "string") {
    setText(children)(domElement);
    return domElement;
  }

  children.map(interpret).forEach(appendTo(domElement));
  return domElement;
};

type GetState<State> = () => State;

type SetState<State> = (state: State) => void;

type StateContract<State> = [GetState<State>, SetState<State>];

type UseState = (slug: string) => <State>(defaultState: State) => StateContract<State>;

const STATES_RECORD: Record<symbol, StateContract<any>> = {};

export const useState: UseState =
  (slug: string) =>
  <State>(defaultState: State) => {
    const symbol = Symbol.for(slug);

    if (STATES_RECORD[symbol]) {
      return STATES_RECORD[symbol];
    }

    let state: State = defaultState;

    const getState = () => {
      return state;
    };

    const setState = (updatedState: State): void => {
      state = updatedState;
      render();
    };

    const result: StateContract<State> = [getState, setState];

    STATES_RECORD[symbol] = result;

    return result;
  };

const bootstrap = (application: Component<{}>): void => {
  const refresh = () => {
    const root = document.getElementById("root");
    const domElement = interpret(application({}));
    root?.replaceChildren(domElement);
  };

  render = refresh;

  refresh();
};

export default bootstrap;
