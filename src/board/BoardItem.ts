import React from "react";
import {
  cls,
  viewCollapsibleContainer,
  css,
  s,
  colors,
  spacings,
} from "../infra";
import { div, fragment, img, span } from "../infra/react";
import viewSubitem from "./Subitem";

type Props = {
  item: Item;
  onItemMouseDown: (item: Item, mousePosition: Point) => void;
};

const getMousePosition = (e: React.MouseEvent): Point => ({
  x: e.screenX,
  y: e.screenY,
});

const BoardItem = ({ item, onItemMouseDown }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return div(
    {
      className: cls.itemCard,
      testId: item.id,
      onMouseDown: (e) => onItemMouseDown(item, getMousePosition(e)),
    },
    div(
      {
        className: cls.itemCardHeader,
        onClick: () => setIsOpen(!isOpen),
      },
      img({ src: getImageSrc(item) }),
      span({ className: cls.cardText }, item.name),
      item.type == "playlist" && span({ className: cls.itemType }, "playlist")
    ),
    item.type === "playlist" &&
      viewCollapsibleContainer(
        { className: cls.subitemsContainer, isOpen },
        () =>
          fragment(
            viewLudovicoSubitem,
            viewLudovicoSubitem,
            viewLudovicoSubitem,
            viewLudovicoSubitem,
            viewLudovicoSubitem,
            viewLudovicoSubitem,
            viewLudovicoSubitem
          )
      )
  );
};
export default BoardItem;
// (item: Item) =>
// React.createElement(BoardItem, { item, key: item.id });

const viewLudovicoSubitem = viewSubitem({
  image: "https://i.ytimg.com/vi/0Bvm9yG4cvs/mqdefault.jpg",
  title: "Ludovico Einaudi - Una mattina FULL ALBUM",
});

css.class(cls.itemCard, {
  position: "relative",
  marginTop: spacings.columnGap,
  backgroundColor: "#f8f9fa",
  borderRadius: 5,
  overflow: "hidden",
  transition: "all 100ms",
  boxShadow: "0 1px 1px rgb(9 30 66 / 25%)",
  userSelect: "none",
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

css.class(cls.itemCardHeader, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  height: spacings.cardHeight,
});

css.hover(cls.itemCardHeader, {
  backgroundColor: colors.light.itemBackgroundHover,
});

css.selector(`.${cls.boardDark} .${cls.itemCardHeader}:hover`, {
  backgroundColor: colors.dark.itemBackgroundHover,
});

css.parentChildTag(cls.itemCardHeader, "img", {
  width: Math.round(spacings.cardHeight * (320 / 180)),
  height: spacings.cardHeight,
  objectFit: "cover",
  display: "block",
});

css.parentChild(cls.itemCardHeader, cls.cardText, {
  lineHeight: 16,
  fontSize: 14,
  ...s.paddingHorizontal(6),
});

css.class(cls.itemType, {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: Math.round(spacings.cardHeight * (320 / 180)),
  fontSize: 11,
  color: "white",
  fontWeight: "bold",
  backgroundColor: colors.itemTypeBackground,
  textAlign: "center",
});

css.class(cls.subitemsContainer, {
  overflow: "hidden",
});

export const getImageSrc = (item: Item): string => {
  if (item.type === "playlist") return item.image;
  else return `https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`;
};
