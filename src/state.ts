import { createStore, Store } from "redux";
import board from "./defaultBoard";
import defaultBoard from "./defaultBoard";
let store: Store<State, Actions>;
export const setGlobalStore = (s: Store<State, Actions>) => (store = s);

export const actions = {
  toggle: (item: Item) => {
    store.dispatch({ type: "toggle_playlist", id: item.id });
  },
};

export type State = {
  board: Board | undefined;
};

const initialState: State = {
  board: defaultBoard,
};

type TogglePlaylist = { type: "toggle_playlist"; id: string };

type Actions = TogglePlaylist;

const reducer = (state = initialState, action: Actions): State => {
  if (action.type == "toggle_playlist") {
    const mapColumn = (column: Column): Column => {
      if (column.items.find((i) => i.id == action.id))
        return {
          ...column,
        };
      return column;
    };
    return {
      ...state,
      board: {
        ...board,
        // columns:
      },
    };
  }
  return state;
};

export const createSlapstukStore = (
  initialState?: State
): Store<State, Actions> => createStore(reducer, initialState);

export const getImageSrc = (item: Item): string => {
  if (item.type === "playlist") return item.image;
  else return `https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`;
};
