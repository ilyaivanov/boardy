import React from "react";
import { cls, css, s, colors } from "../infra";
import { div, img, span } from "../infra/react";

type SubitemProps = { title: string; image: string };
const Subitem = ({ title, image }: SubitemProps) =>
  div({ className: cls.subitem }, img({ src: image }), span({}, title));

css.class(cls.subitem, {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "8px 14px",
  cursor: "pointer",
  borderTop: s.solidBorder(1, colors.light.border),
});

css.parentChild(cls.boardDark, cls.subitem, {
  borderTop: s.solidBorder(1, colors.dark.border),
});

css.hover(cls.subitem, {
  backgroundColor: colors.light.itemBackgroundHover,
});

css.selector(`.${cls.boardDark} .${cls.subitem}:hover`, {
  backgroundColor: colors.dark.itemBackgroundHover,
});

css.parentChildTag(cls.subitem, "img", {
  height: 40,
  width: 40,
  borderRadius: 4,
  objectFit: "cover",
});

css.parentChildTag(cls.subitem, "span", {
  flex: 1,
  padding: "0 6px",
  paddingRight: 0,
  fontSize: 12,
});

export default (props: SubitemProps) => React.createElement(Subitem, props);
