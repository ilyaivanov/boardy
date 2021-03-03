import { createStore, Store } from "redux";
let store: Store;
export const setGlobalStore = (s: Store) => (store = s);
export const actions = {
  increment: () => {
    store.dispatch({ type: "increment" });
  },
  decrement: () => {
    store.dispatch({ type: "decrement" });
  },
};

export type State = {
  counter: number;
};

const initialState: State = {
  counter: 1,
};

type Increment = { type: "increment" };
type Decrement = { type: "decrement" };

type Action = Increment | Decrement;

const reducer = (state = initialState, action: Action): State => {
  if (action.type == "decrement")
    return {
      ...state,
      counter: state.counter - 1,
    };
  if (action.type == "increment")
    return {
      ...state,
      counter: state.counter + 1,
    };
  return state;
};

export const createSlapstukStore = (initialState?: State) =>
  createStore(reducer, initialState);
