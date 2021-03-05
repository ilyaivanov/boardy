import React from "react";
import { cls, css, s, colors, spacings } from "../infra";
import { div, img, span } from "../infra/react";
import { getImageSrc } from "../state";

type Props = {
  item: Item;
  onItemMouseDown: (item: Item, mousePosition: Point) => void;
};

const getMousePosition = (e: React.MouseEvent): Point => ({
  x: e.screenX,
  y: e.screenY,
});

const BoardItem = ({ item, onItemMouseDown }: Props) =>
  div(
    {
      className: cls.itemCard,
      testId: item.id,
      onMouseDown: (e) => onItemMouseDown(item, getMousePosition(e)),
    },
    img({ src: getImageSrc(item) || "" }),
    span({ className: cls.cardText }, item.title)
  );

export default BoardItem;

css.class(cls.itemCard, {
  marginTop: spacings.distanceBetweenCards,
  backgroundColor: colors.itemBody,
  borderRadius: 4,
  overflow: "hidden",
  transition: "all 100ms",
  boxShadow: "1px 1px 2px rgba(0,0,0,0.25)",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  height: spacings.cardHeight,
});

css.hover(cls.itemCard, {
  boxShadow: "1px 2px 5px 0 rgb(0 0 0 / 53%)",
});

css.active(cls.itemCard, {
  boxShadow: "1px 2px 3px hsla(0, 0%, 0%, 0.2)",
});

css.lastOfType(cls.itemCard, {
  marginBottom: spacings.columnGap,
});

css.parentChild(cls.boardDark, cls.itemCard, {
  backgroundColor: colors.dark.itemBackground,
});

css.hover(cls.itemCard, {
  backgroundColor: colors.light.itemBackgroundHover,
});

css.selector(`.${cls.boardDark} .${cls.itemCard}:hover`, {
  backgroundColor: colors.dark.itemBackgroundHover,
});

//(320 / 180)
const IMAGE_WIDTH = Math.round(spacings.cardHeight * 1.5);

css.parentChildTag(cls.itemCard, "img", {
  width: IMAGE_WIDTH,
  height: spacings.cardHeight,
  objectFit: "cover",
  display: "block",
});

css.class(cls.cardText, {
  lineHeight: 16,
  fontSize: 14,
  ...s.paddingHorizontal(6),
});
