export const cls = {
  //board
  board: "board",
  column: "column",
  columnTitle: "column-title",
  itemsContainer: "items-container",
  itemCard: "item-card",
  cardText: "card-text",
  itemType: "item-type",
  itemCardHeader: "item-card-header",
  subitem: "subitem",
  subitemsContainer: "subitems-container",
  boardDark: "board-dark",
  addColumnButton: "add-column-button",
  boardRightEndSpacing: "board-right-end-spacing",
  header: "header",
  page: "page",

  rightSidebar: "right-sidebar",
  rightSidebarHidden: "right-sidebar-hidden",
  none: "",
} as const;

export const ids = {
  root: "root",
} as const;

export const tIds = {};

export const zIndexes = {
  dragAvatar: 200,
  header: 300,
  rightSidebar: 250,
};

export type ClassName = valueof<typeof cls>;
export type ClassMap = Partial<Record<ClassName, boolean>>;
