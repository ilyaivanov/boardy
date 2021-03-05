export const cls = {
  //board
  board: "board",
  column: "column",
  columnTitle: "column-title",
  itemsContainer: "items-container",
  itemCard: "item-card",
  cardText: "card-text",
  boardDark: "board-dark",
  addColumnButton: "add-column-button",
  boardRightEndSpacing: "board-right-end-spacing",
  header: "header",
  page: "page",

  //Sidebar
  rightSidebar: "right-sidebar",
  rightSidebarHidden: "right-sidebar-hidden",
  leftSidebar: "left-sidebar",
  leftSidebarHidden: "left-sidebar-hidden",
  //Sidebar Items
  row: "row",
  rowSelected: "row-selected",
  rowText: "rowText",
  icon: "icon",
  iconHidden: "icon-hidden",
  rowIcon: "row-icon",
  sidebarHeader: "sidebar-header",
  createFolderIcon: "create-folder-icon",
  rowChevronRotated: "row-chevron-rotated",
  rowChevron: "row-chevron",
  unfocusArrow: "unfocus-arrow",
  rowCircle: "row-circle",
  sidebarFolderIcon: "sidebar-folder-icon",
  sidebarVideoIcon: "sidebar-video-icon",
  sidebarChannelIcon: "sidebar-channel-icon",
  sidebarPlaylistIcon: "sidebar-playlist-icon",
  childrenContainer: "children-container",
  rowFocused: "row-focused",
  rowMenuIcon: "row-menu-icon",
  rowMenuButton: "row-menu-button",
  rowTitleInput: "row-title-input",
  //Sidebar UI
  sidebarWidthAdjuster: "sidebar-width-adjuster",
  sidebarWidthAdjusterActive: "sidebar-width-adjuster-active",
  sidebarScrollArea: "sidebar-scroll-area",
  //Context Menu
  contextMenu: "context-menu",
  contextMenuRow: "context-menu-row",

  none: "",
} as const;

export const ids = {
  root: "root",
} as const;

export const tIds = {
  leftSidebarToggler: "leftSidebarToggler",
  rightSidebarToggler: "rightSidebarToggler",
  contextMenu: "contextMenu",
  contextMenuDelete: "contextMenuDelete",
  contextMenuRename: "contextMenuRename",
};

export const zIndexes = {
  dragAvatar: 200,
  header: 300,
  rightSidebar: 250,
  leftSidebar: 250,
};

export type ClassName = valueof<typeof cls>;
export type ClassMap = Partial<Record<ClassName, boolean>>;
