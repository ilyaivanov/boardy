import React from "react";
import { cls, css, s, colors, spacings, zIndexes } from "./infra";
import { div, button, checkbox } from "./infra/react";

interface HeaderProps {
  isDark: boolean;
  onDarkChanged: (d: boolean) => void;
  toggleRightSidebar: () => void;
  toggleLeftSidebar: () => void;
}

const Header = (props: HeaderProps) =>
  div(
    {
      className: cls.header,
    },
    checkbox({
      checked: props.isDark,
      onChange: (e) => props.onDarkChanged(e.currentTarget.checked),
    }),
    button(
      { testId: "leftSidebarToggler", onClick: props.toggleLeftSidebar },
      "left"
    ),
    button(
      { testId: "rightSidebarToggler", onClick: props.toggleRightSidebar },
      "right"
    )
  );

css.class(cls.header, {
  gridArea: "header",
  backgroundColor: "rgba(0,0,0,.32)",
  height: spacings.headerHeight,
  borderBottom: s.solidBorder(1, colors.light.border),
  zIndex: zIndexes.header,
  color: "#172b4d",
});

css.parentChild(cls.boardDark, cls.header, {
  backgroundColor: colors.dark.itemBackground,
  borderBottom: s.solidBorder(1, colors.dark.border),
});

export default (props: HeaderProps) => React.createElement(Header, props);
