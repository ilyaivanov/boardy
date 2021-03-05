import { createStore, Store } from "redux";
// import board from "./defaultBoard";
// import defaultBoard from "./defaultBoard";
let store: Store<State, Actions>;
export const setGlobalStore = (s: Store<State, Actions>) => (store = s);

export const actions = {
  assignUiOptions: (options: Partial<UIOptions>) => {
    store.dispatch({ type: "assign-ui-options", options });
  },
};

export type State = {
  // board: Board | undefined;
  uiOptions: UIOptions;
};

export type UIOptions = {
  // focusedNode: string;
  // selectedNode: string;
  // itemIdBeingPlayed?: string;
  leftSidebarWidth: number;
  isLeftSidebarVisible: boolean;
  rightSidebarWidth: number;
  isRightSidebarVisible: boolean;
  isDarkMode: boolean;
  // galleryMode: "list" | "gallery";
};

const initialState: State = {
  // board: defaultBoard,
  uiOptions: {
    isDarkMode: false,
    isLeftSidebarVisible: false,
    isRightSidebarVisible: false,
    leftSidebarWidth: 350,
    rightSidebarWidth: 350,
  },
};

type AssignUiOptions = {
  type: "assign-ui-options";
  options: Partial<UIOptions>;
};

type Actions = AssignUiOptions;

const reducer = (state = initialState, action: Actions): State => {
  if (action.type == "assign-ui-options") {
    return {
      ...state,
      uiOptions: {
        ...state.uiOptions,
        ...action.options,
      },
    };
  }
  return state;
};

export const createSlapstukStore = (
  initialState?: State
): Store<State, Actions> => createStore(reducer, initialState);

// export const getImageSrc = (item: Item): string => {
//   if (item.type === "playlist") return item.image;
//   else return `https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`;
// };
