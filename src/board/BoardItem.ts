export const a = 1;
// import React from "react";
// import { cls, css, s, colors, spacings } from "../infra";
// import { div, img, span } from "../infra/react";
// import { getImageSrc } from "../state";

// type Props = {
//   item: Item;
//   onItemMouseDown: (item: Item, mousePosition: Point) => void;
// };

// const getMousePosition = (e: React.MouseEvent): Point => ({
//   x: e.screenX,
//   y: e.screenY,
// });

// const BoardItem = ({ item, onItemMouseDown }: Props) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   return div(
//     {
//       className: cls.itemCard,
//       testId: item.id,
//       onMouseDown: (e) => onItemMouseDown(item, getMousePosition(e)),
//     },
//     div(
//       {
//         className: cls.itemCardHeader,
//         onClick: () => setIsOpen(!isOpen),
//       },
//       img({ src: getImageSrc(item) }),
//       span({ className: cls.cardText }, item.name)
//     )
//   );
// };
// export default BoardItem;

// css.class(cls.itemCard, {
//   position: "relative",
//   marginTop: spacings.distanceBetweenCards,
//   backgroundColor: "#ebecf0",
//   // backgroundColor: "#f8f9fa",
//   borderRadius: 5,
//   overflow: "hidden",
//   transition: "all 100ms",
//   boxShadow: "0 1px 1px rgb(9 30 66 / 25%)",
//   userSelect: "none",
// });

// css.hover(cls.itemCard, {
//   boxShadow: "1px 2px 5px 0 rgb(0 0 0 / 53%)",
// });

// css.active(cls.itemCard, {
//   boxShadow: "1px 2px 3px hsla(0, 0%, 0%, 0.2)",
// });

// css.lastOfType(cls.itemCard, {
//   marginBottom: spacings.columnGap,
// });

// css.parentChild(cls.boardDark, cls.itemCard, {
//   backgroundColor: colors.dark.itemBackground,
// });

// css.class(cls.itemCardHeader, {
//   position: "relative",
//   display: "flex",
//   alignItems: "center",
//   cursor: "pointer",
//   height: spacings.cardHeight,
// });

// css.hover(cls.itemCardHeader, {
//   backgroundColor: colors.light.itemBackgroundHover,
// });

// css.selector(`.${cls.boardDark} .${cls.itemCardHeader}:hover`, {
//   backgroundColor: colors.dark.itemBackgroundHover,
// });

// //(320 / 180)
// const IMAGE_WIDTH = Math.round(spacings.cardHeight * 1.5);

// css.parentChildTag(cls.itemCardHeader, "img", {
//   width: IMAGE_WIDTH,
//   height: spacings.cardHeight,
//   objectFit: "cover",
//   display: "block",
// });

// css.parentChild(cls.itemCardHeader, cls.cardText, {
//   lineHeight: 16,
//   fontSize: 14,
//   ...s.paddingHorizontal(6),
// });
