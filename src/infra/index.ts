export { div, button, e } from "./react";
export { css, s } from "./style";
export { zIndexes, tIds, cls } from "./projectSpecific/keys";
export { colors, spacings, typography } from "./projectSpecific/constants";
export type { ClassName, ClassMap } from "./projectSpecific/keys";
export { collapsibleContainer as viewCollapsibleContainer } from "./CollapsibleContainer";
export * as icons from "./icons";
export * as utils from "./utils";

//TODO: remove this function after migration
export const cn = (classes: any) =>
  Object.keys(classes)
    .filter((key) => !!classes[key])
    .join(" ");
