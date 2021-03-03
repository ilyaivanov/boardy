import React from "react";
import { cls, css, s, colors, spacings, zIndexes } from "./infra";
import { div, button, checkbox } from "./infra/react";

interface HeaderProps {
  isDark: boolean;
  onDarkChanged: (d: boolean) => void;
  toggleRightSidebar: () => void;
}

const Header = ({ isDark, onDarkChanged, toggleRightSidebar }: HeaderProps) =>
  div(
    {
      className: cls.header,
    },
    checkbox({
      checked: isDark,
      onChange: (e) => onDarkChanged(e.currentTarget.checked),
    }),
    button({ onClick: toggleRightSidebar }, "toggle")
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
