import React from "react";
import BoardView from "./board/BoardView";
import header from "./Header";
import { cls, css, zIndexes, div, e } from "./infra";

interface Props {
  board: Board;
}
function App({ board }: Props) {
  const [isDark, setIsDark] = React.useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);
  const ref = React.createRef<HTMLDivElement>();
  return div(
    {
      className: cls.page,
      clsMap: { "board-dark": isDark },
      ref,
      style: { backgroundPositionX: "0%" },
    },
    header({
      isDark,
      onDarkChanged: (isNewDark) => setIsDark(isNewDark),
      toggleRightSidebar: () => setIsSidebarVisible(!isSidebarVisible),
    }),
    e(BoardView, {
      board,
      onScroll: (e) => syncBackgroundXPositionWithScroll(ref.current, e),
      onItemMouseDown: (item, mousePos) => {
        console.log(item, mousePos);
      },
    }),
    div({
      className: cls.rightSidebar,
      clsMap: { [cls.rightSidebarHidden]: !isSidebarVisible },
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

export const viewApp = (board: Board) => e(App, { board });

export default App;

css.class(cls.page, {
  width: "100vw",
  height: "100vh",
  display: "grid",
  overflow: "hidden",
  gridTemplateRows: "auto 1fr",
  // gridTemplateRows: "auto 1fr auto",
  gridTemplateColumns: "1fr auto",
  gridTemplateAreas: `
    "header header"
    "board rightSidebar"
  `,

  // background:
  //   "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/8226b6654c1221c5cdba81ab4db86760/photo-1612701943975-7814268fab1f.jpg)",
  // backgroundSize: "cover",
  // backgroundPositionY: "center",
});

const defaultSidebarWidth = 350;
css.class(cls.rightSidebar, {
  gridArea: "rightSidebar",
  width: defaultSidebarWidth,
  boxShadow: "0px 5px 5px 0 rgb(0 0 0 / 53%)",
  backgroundColor: "white",
  zIndex: zIndexes.rightSidebar,
  transition: "margin 200ms",
});

css.class(cls.rightSidebarHidden, {
  marginRight: -defaultSidebarWidth,
});
