import { ClassName, ids } from "./projectSpecific/keys";
// import * as dom from "./dom";
import * as CSS from "csstype";
export type Styles = CSS.Properties<string | number>;

const dom = {
  root: document.getElementById(ids.root) as HTMLElement,
};
const styleElemenet = document.createElement("style");
styleElemenet.innerHTML = ``;
document.head.appendChild(styleElemenet);

export const selector = (selector: string | string[], styles: Styles) => {
  const res = Array.isArray(selector) ? selector.join(", ") : selector;
  const text = cssToString(res, styles);
  styleElemenet.innerHTML += text;
};

export const cssText = (text: string) => {
  styleElemenet.innerHTML += text;
};

const cssToString = (selector: string, props: Styles) => {
  const div = document.createElement("div");
  Object.assign(div.style, convertNumericStylesToPixels(props));
  return `${selector} {
    ${div.style.cssText}
  }
  `;
};
type Tag = keyof HTMLElementTagNameMap;
export const css = {
  id: (id: string, style: Styles) => selector("#" + id, style),
  tag: (tag: Tag, style: Styles) => selector(tag, style),
  class: (c1: ClassName, style: Styles) => selector(`.${c1}`, style),
  class2: (c1: ClassName, c2: ClassName, style: Styles) =>
    selector(`.${c1}.${c2}`, style),
  class3: (c1: ClassName, c2: ClassName, c3: ClassName, style: Styles) =>
    selector(`.${c1}.${c2}.${c3}`, style),
  parentChild: (c1: ClassName, c2: ClassName, style: Styles) =>
    selector(`.${c1} .${c2}`, style),
  onParentHover: (c1: ClassName, c2: ClassName, style: Styles) =>
    selector(`.${c1}:hover .${c2}`, style),
  parentChildTag: (c1: ClassName, tag: Tag, style: Styles) =>
    selector(`.${c1} ${tag}`, style),
  onClassParentHoverForTag: (c1: ClassName, tag: Tag, style: Styles) =>
    selector(`.${c1}:hover ${tag}`, style),
  active: (className: ClassName, style: Styles) =>
    selector(`.${className}:active`, style),
  hover: (className: ClassName, style: Styles) =>
    selector(`.${className}:hover`, style),
  focus: (className: ClassName, style: Styles) =>
    selector(`.${className}:focus`, style),
  lastOfType: (className: ClassName, style: Styles) =>
    selector(`.${className}:last-of-type`, style),
  firstOfType: (className: ClassName, style: Styles) =>
    selector(`.${className}:first-of-type`, style),
  parentHover: (parentClass: ClassName, childClass: ClassName, style: Styles) =>
    selector(`.${parentClass}:hover .${childClass}`, style),
  text: cssText,
  selector,
};

export const s = {
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as const,
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
  } as const,
  solidBorder: (size: number, color: string) => `${size}px solid ${color}`,

  paddingHorizontal: (val: number) => ({
    paddingLeft: val,
    paddingRight: val,
  }),
  paddingVertical: (val: number) => ({
    paddingTop: val,
    paddingBottom: val,
  }),

  absoluteTopRight: (top: number, right: number) =>
    ({
      position: "absolute",
      top: top + "px",
      right: right + "px",
    } as const),
  absoluteTopLeft: (top: number, left: number) =>
    ({
      position: "absolute",
      top: top + "px",
      left: left + "px",
    } as const),
  rotate: (deg: number) => ({
    transform: `rotateZ(${deg}deg)`,
  }),

  scrollbar: (
    className: ClassName,
    { width, height, color }: { width?: number; height?: number; color: string }
  ) =>
    `
  .${className}::-webkit-scrollbar {
    ${width ? "width:" + width + "px" : ""}
    ${height ? "height:" + height + "px" : ""}
  }
  
  .${className}::-webkit-scrollbar-thumb {
    background-color: ${color};
  }
  `,

  cssPlayerHeightVariable: "-player-height",
  //this variable is used to set maxHeight for cards
  setPlayerHeightRootVariable: (height: number) =>
    dom.root.style.setProperty("--player-height", `${height}px`),

  cssLeftSidebarWidthVariable: "var(--sidebar-left-width)",

  setLeftSidebarWidth: (width: number) =>
    dom.root.style.setProperty("--sidebar-left-width", `${width}px`),

  cssRightSidebarWidthVariable: "var(--sidebar-right-width)",

  setRightSidebarWidth: (width: number) =>
    dom.root.style.setProperty("--sidebar-right-width", `${width}px`),
  cancelAllCurrentAnimations: (elem: HTMLElement) =>
    elem.getAnimations().forEach((a) => a.cancel()),
};

//I'm using whitelist approach
//in other words I add px to every number values expect 'opacity', 'flex' and other
//and I'm leaving zeros for any value as string without px postfix
const whitelist: Styles = {
  zIndex: 1,
  opacity: 1,
  flex: 1,
  fontWeight: 1,
};
export const convertNumericStylesToPixels = (
  s: Styles
): Partial<CSSStyleDeclaration> => {
  let res: any = {};
  const sCo = s as any;
  Object.keys(s).forEach((key) => {
    if (
      typeof sCo[key] == "string" ||
      !!(whitelist as any)[key] ||
      sCo[key] === 0
    )
      res[key] = sCo[key] + "";
    else res[key] = sCo[key] + "px";
  });
  return res;
};
