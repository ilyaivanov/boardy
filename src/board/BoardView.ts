import React from "react";
import { cls, css, s, colors, spacings } from "../infra";
import { div, span } from "../infra/react";
import BoardItem from "./BoardItem";

const e = React.createElement;
type Props = {
  board: Board;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onItemMouseDown: (item: Item, point: Point) => void;
};

class BoardView extends React.Component<Props> {
  renderColumn = (column: Column) =>
    div(
      {
        key: column.id,
        className: cls.column,
      },
      span({ className: cls.columnTitle }, column.name),
      div(
        { className: cls.itemsContainer },
        column.items.map((item) =>
          e(BoardItem, {
            key: item.id,
            item,
            onItemMouseDown: this.props.onItemMouseDown,
          })
        )
      )
    );

  render() {
    return div(
      {
        className: cls.board,
        onScroll: this.props.onScroll,
      },
      this.props.board.columns.map(this.renderColumn),
      span({ className: cls.addColumnButton }, "+"),
      div({ className: cls.boardRightEndSpacing })
    );
  }
}

css.class(cls.board, {
  gridArea: "board",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  height: `calc(100vh - ${spacings.headerHeight}px)`,
  // color: colors.light.text,
  color: "black",
  overflowX: "auto",
  paddingTop: spacings.columnGap,
  paddingBottom: spacings.distanceBetweenScrollAndColumnSeparator,
  backgroundColor: "rgb(131, 140, 145)",
});

css.text(s.scrollbar(cls.board, { height: 6, color: colors.light.scrollbar }));

css.parentChild(cls.boardDark, cls.board, {
  backgroundColor: colors.dark.boardBackground,
  color: colors.dark.text,
});

css.class(cls.column, {
  display: "flex",
  position: "relative",
  flexDirection: "column",
  minWidth: 256,
  width: 256,
  // borderRight: s.solidBorder(1, colors.light.border),
  paddingLeft: spacings.columnGap,
  /* one piexel of space between scroll and border */
  paddingRight: spacings.distanceBetweenScrollAndColumnSeparator,
});

css.parentChild(cls.boardDark, cls.column, {
  borderRight: s.solidBorder(1, colors.dark.border),
});

css.class(cls.columnTitle, {
  fontWeight: 700,
  fontSize: 26,
});

css.class(cls.itemsContainer, {
  flex: 1,
  overflowY: "overlay" as any,
  paddingRight:
    spacings.columnGap - spacings.distanceBetweenScrollAndColumnSeparator,
});

css.class(cls.addColumnButton, {
  marginLeft: spacings.columnGap,
  width: 250,
  minWidth: 250,
  height: 40,
  backgroundColor: colors.light.itemBackground,
  cursor: "pointer",
  fontSize: 26,
  lineHeight: 26,
  fontWeight: 700,
  ...s.flexCenter,
});

css.class(cls.boardRightEndSpacing, {
  width: spacings.columnGap,
  minWidth: spacings.columnGap,
  height: 30, //any non-zero value
});

css.text(
  s.scrollbar(cls.itemsContainer, {
    width: 6,
    color: colors.light.scrollbar,
  })
);

export default BoardView; //  (props: Props) => React.createElement(BoardView, props);
