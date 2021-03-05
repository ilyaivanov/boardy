import React from "react";
import { connect } from "react-redux";
import BoardView from "./board/BoardView";
import header from "./Header";
import { cls, css, zIndexes, div, e } from "./infra";
import { actions, State } from "./state";

type Props = ReturnType<typeof mapState>;

function App({ board, uiOptions }: Props) {
  const ref = React.createRef<HTMLDivElement>();
  if (!board) return null;

  return div(
    {
      className: cls.page,
      clsMap: { "board-dark": uiOptions.isDarkMode },
      ref,
      style: { backgroundPositionX: "0%" },
    },
    header({
      isDark: uiOptions.isDarkMode,
      onDarkChanged: (isDarkMode) =>
        actions.assignUiOptions({
          isDarkMode,
        }),
      toggleRightSidebar: () =>
        actions.assignUiOptions({
          isRightSidebarVisible: !uiOptions.isRightSidebarVisible,
        }),
      toggleLeftSidebar: () =>
        actions.assignUiOptions({
          isLeftSidebarVisible: !uiOptions.isLeftSidebarVisible,
        }),
    }),
    e(BoardView, {
      board,
      onScroll: (e) => syncBackgroundXPositionWithScroll(ref.current, e),
      onItemMouseDown: (item, mousePos) => {
        console.log(item, mousePos);
      },
    }),
    div({
      testId: "rightSidebar",
      className: cls.rightSidebar,
      clsMap: { [cls.rightSidebarHidden]: !uiOptions.isRightSidebarVisible },
    }),

    div({
      testId: "leftSidebar",
      className: cls.leftSidebar,
      clsMap: { [cls.leftSidebarHidden]: !uiOptions.isLeftSidebarVisible },
    })
  );
}

const syncBackgroundXPositionWithScroll = (
  board: HTMLDivElement | null,
  scrollEvent: React.UIEvent<HTMLElement>
) => {
  if (!board) return;
  const elem = scrollEvent.currentTarget;
  const currentPercent = Number.parseInt(board.style.backgroundPositionX);
  const maxScrollLeft = elem.scrollWidth - elem.offsetWidth;
  const newPercent = Math.round((elem.scrollLeft / maxScrollLeft) * 100);
  if (newPercent != currentPercent)
    board.style.backgroundPositionX = newPercent + "%";
};

const mapState = (state: State) => ({
  board: state.board,
  uiOptions: state.uiOptions,
});

export const viewApp = () => e(connect(mapState)(App));

css.class(cls.page, {
  width: "100vw",
  height: "100vh",
  display: "grid",
  overflow: "hidden",
  gridTemplateRows: "auto 1fr",
  // gridTemplateRows: "auto 1fr auto",
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateAreas: `
    "header header header"
    "leftSidebar board rightSidebar"
  `,

  // background:
  //   "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/8226b6654c1221c5cdba81ab4db86760/photo-1612701943975-7814268fab1f.jpg)",
  // backgroundSize: "cover",
  // backgroundPositionY: "center",
});

const defaultRightSidebarWidth = 350;
css.class(cls.rightSidebar, {
  gridArea: "rightSidebar",
  width: defaultRightSidebarWidth,
  boxShadow: "0px 5px 5px 0 rgb(0 0 0 / 53%)",
  backgroundColor: "white",
  zIndex: zIndexes.rightSidebar,
  transition: "margin 200ms",
});

css.class(cls.rightSidebarHidden, {
  marginRight: -defaultRightSidebarWidth,
});

const defaultLeftSidebarWidth = 350;
css.class(cls.leftSidebar, {
  gridArea: "leftSidebar",
  width: defaultLeftSidebarWidth,
  boxShadow: "0px 5px 5px 0 rgb(0 0 0 / 53%)",
  backgroundColor: "white",
  zIndex: zIndexes.leftSidebar,
  transition: "margin 200ms",
});

css.class(cls.leftSidebarHidden, {
  marginLeft: -defaultLeftSidebarWidth,
});
