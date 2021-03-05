import { createStore, Store } from "redux";
import { colors } from "./infra";

// import board from "./defaultBoard";
// import defaultBoard from "./defaultBoard";
let store: Store<State, Action>;
export const setGlobalStore = (s: Store<State, Action>) => {
  store = s;
  //@ts-expect-error
  global.store = s;
};

export const actions = {
  assignUiOptions: (payload: Partial<UIOptions>) =>
    store.dispatch({ type: "assign-ui-options", payload }),

  selectItem: (selectedNode: string) =>
    store.dispatch({
      type: "assign-ui-options",
      payload: { selectedNode },
    }),

  setItems: (payload: Items) => store.dispatch({ type: "items/set", payload }),
};

export type State = {
  // board: Board | undefined;
  uiOptions: UIOptions;
  uiState: UIState;
  items: Items;
};

export type UIOptions = {
  focusedNode: string;
  selectedNode: string;
  // itemIdBeingPlayed?: string;
  leftSidebarWidth: number;
  isLeftSidebarVisible: boolean;
  rightSidebarWidth: number;
  isRightSidebarVisible: boolean;
  isDarkMode: boolean;
  // galleryMode: "list" | "gallery";
};

export type UIState = {
  isMouseDownOnAdjuster: boolean;
  // appState: GlobalAppState;
  // contextMenu?: ContextMenu;
  renameState?: RenameState;
  // user?: UserInfo;
};

export type RenameState = {
  itemBeingRenamed: string;
  newName: string;
};

export const initialState: State = {
  // board: defaultBoard,
  items: {
    HOME: {
      id: "HOME",
      children: [],
      title: "Home",
      type: "folder",
    },
  },
  uiOptions: {
    selectedNode: "HOME",
    focusedNode: "HOME",
    isDarkMode: false,
    isLeftSidebarVisible: false,
    isRightSidebarVisible: false,
    leftSidebarWidth: 350,
    rightSidebarWidth: 350,
  },
  uiState: {
    isMouseDownOnAdjuster: false,
  },
};

type ActionPayload<ActionStringType, PayloadType> = {
  type: ActionStringType;
  payload: PayloadType;
};

export type Action =
  | ActionPayload<"assign-ui-options", Partial<UIOptions>>
  | ActionPayload<"items/set", Items>;

const reducer = (state = initialState, action: Action): State => {
  if (action.type == "assign-ui-options") {
    return {
      ...state,
      uiOptions: {
        ...state.uiOptions,
        ...action.payload,
      },
    };
  }
  if (action.type === "items/set") {
    return {
      ...state,
      items: action.payload,
    };
  }
  return state;
};

export const createSlapstukStore = (
  initialState?: State
): Store<State, Action> => createStore(reducer, initialState);

//****************************************************\\
//********************SELECTORS***********************\\
//****************************************************\\

//Some behaviour on top of items
export const isFolder = (item: Item): item is Folder => {
  return item.type == "folder";
};
export const isPlaylist = (item: Item): item is YoutubePlaylist => {
  return item.type == "YTplaylist";
};

export const isVideo = (item: Item): item is YoutubeVideo => {
  return item.type == "YTvideo";
};

export const isChannel = (item: Item): item is YoutubeChannel => {
  return item.type == "YTchannel";
};

export const isSearch = (item: Item): item is SearchContainer => {
  return item.type == "search";
};

export function isContainer(item: Item): item is ItemContainer {
  return (
    item.type == "YTchannel" ||
    item.type == "folder" ||
    item.type == "search" ||
    item.type == "YTplaylist"
  );
}

export const isNeedsToBeLoaded = (item: Item): boolean =>
  (isPlaylist(item) && item.children.length == 0 && !item.isLoading) ||
  (isSearch(item) && item.children.length == 0 && !item.isLoading) ||
  (isChannel(item) && item.children.length == 0 && !item.isLoading);

export const hasNextPage = (item: Item): boolean =>
  (isPlaylist(item) && !!item.nextPageToken && !item.isLoading) ||
  (isChannel(item) && !!item.nextPageToken && !item.isLoading) ||
  (isSearch(item) && !!item.nextPageToken && !item.isLoading);

export const isLoadingAnything = (item: Item): boolean => {
  return (
    (isPlaylist(item) && !!item.isLoading) ||
    (isChannel(item) && !!item.isLoading) ||
    (isSearch(item) && !!item.isLoading)
  );
};
export const isLoadingNextPage = (item: Item): boolean => {
  return (
    (isPlaylist(item) && !!item.isLoading && !!item.nextPageToken) ||
    (isChannel(item) && !!item.isLoading && !!item.nextPageToken) ||
    (isSearch(item) && !!item.isLoading && !!item.nextPageToken)
  );
};

export const isOpenAtSidebar = (item: Item) =>
  isContainer(item) &&
  (typeof item.isOpenFromSidebar != "undefined"
    ? item.isOpenFromSidebar
    : false);

export const isOpenAtGallery = (item: Item) =>
  isContainer(item) && !item.isCollapsedInGallery;

export const getItemColor = (item: Item): string => {
  if (isFolder(item)) return colors.folderColor;
  if (isChannel(item)) return colors.channelColor;
  if (isPlaylist(item)) return colors.playlistColor;
  if (isVideo(item)) return colors.videoColor;
  return "white";
};
export const getChildren = (itemId: string, allItems: Items): Item[] => {
  const item = allItems[itemId];
  if (isContainer(item)) return item.children.map((id) => allItems[id]);
  else return [];
};

export const getParent = (
  itemId: string,
  allItems: Items
): ItemContainer | undefined =>
  Object.values(allItems).find(
    (item) => isContainer(item) && item.children.indexOf(itemId) >= 0
  ) as ItemContainer;

export const hasItemInPath = (
  itemId: string,
  potentialParentId: string,
  allITems: Items
) => {
  let parent = getParent(itemId, allITems);
  while (parent) {
    if (parent.id == potentialParentId) return true;
    parent = getParent(parent.id, allITems);
  }
  return false;
};

export const createPersistedState = (state: State): PersistedState => {
  const homeNodes: Items = {};
  const traverse = (id: string) => {
    const item = state.items[id];
    homeNodes[id] = item;
    if (isContainer(item) && item.children.length > 0) {
      item.children.forEach(traverse);
    }
  };
  traverse("HOME");

  const count = (items: Items) => Object.keys(items).length;
  console.log(
    `Saving to backend ${count(homeNodes)} (from ${count(state.items)})`
  );

  //selected node might be removed, in that case point to a HOME
  const selectedItemId = homeNodes[state.uiOptions.selectedNode]
    ? state.uiOptions.selectedNode
    : "HOME";
  return {
    focusedStack: [],
    itemsSerialized: JSON.stringify(homeNodes),
    selectedItemId,
  };
};

export const getPreviewImages = (
  item: Item,
  count: number,
  allItems: Items
): string[] =>
  getChildren(item.id, allItems)
    .map((c) => getFirstImage(c, allItems))
    .filter((x) => !!x)
    .slice(0, count) as string[];

export const getFirstImage = (
  item: Item,
  allItems: Items
): string | undefined => {
  if (isFolder(item)) {
    const children = getChildren(item.id, allItems);
    return children
      .map((c) => getFirstImage(c, allItems))
      .filter((x) => !!x)[0] as string;
  }
  return getImageSrc(item) as string;
};

export const getFirstVideo = (
  item: Item,
  allItems: Items
): YoutubeVideo | undefined => {
  if (isContainer(item)) {
    const children = getChildren(item.id, allItems);
    return children
      .map((c) => getFirstVideo(c, allItems))
      .filter((x) => !!x)[0] as YoutubeVideo;
  } else if (isVideo(item)) return item;
};

export const getImageSrc = (item: Item): string | undefined => {
  if (isVideo(item))
    return `https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`;
  else if (isPlaylist(item) || isChannel(item)) return item.image;
  else return undefined;
};
