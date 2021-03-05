import React from "react";
import { cls, css, s, colors, spacings } from "../infra";
import { div, span, e } from "../infra/react";
import BoardItem from "./BoardItem";
import * as items from "../state";

type Props = {
  items: Items;
  itemToShow: string;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onItemMouseDown: (item: Item, point: Point) => void;
};

class BoardView extends React.Component<Props> {
  renderColumn = (item: Item) =>
    div(
      {
        key: item.id,
        className: cls.column,
      },
      span({ className: cls.columnTitle }, item.title),
      div(
        { className: cls.itemsContainer },
        items.getChildren(item.id, this.props.items).map((item) =>
          e(BoardItem, {
            key: item.id,
            item,
            onItemMouseDown: this.props.onItemMouseDown,
          })
        )
      )
    );

  render() {
    const item = this.props.items[this.props.itemToShow];
    if (items.isVideo(item)) return null;
    const children = items.getChildren(item.id, this.props.items);
    return div(
      {
        className: cls.board,
        onScroll: this.props.onScroll,
      },
      children.map(this.renderColumn),
      span({ className: cls.addColumnButton }, "+"),
      div({ className: cls.boardRightEndSpacing })
    );
  }
}
export default (props: Props) => e(BoardView, props);

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
  backgroundColor: colors.body,
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
  minWidth: 290,
  width: 290,
  borderRight: s.solidBorder(1, colors.light.border),
  paddingBottom: spacings.distanceBetweenCards,
  paddingLeft: spacings.columnGap,
  /* one piexel of space between scroll and border */
  paddingRight: spacings.distanceBetweenScrollAndColumnSeparator,
});

css.firstOfType(cls.column, {
  marginLeft: 40 - spacings.columnGap,
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
