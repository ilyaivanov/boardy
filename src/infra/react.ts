import React from "react";
import { ClassName, ClassMap } from ".";
import { convertNumericStylesToPixels, Styles } from "./style";

type BaseProps<T> = React.DOMAttributes<T> & {
  className?: ClassName;
  clsMap?: {};
  testId?: string;
  key?: string;
  ref?: React.RefObject<T>;
  style?: Styles;
};

type Children = React.ReactNode | React.ReactNode[];

const handleBaseProps = <T>(props: BaseProps<T>) => {
  //@ts-expect-error
  props["data-testid"] = props.testId;
  delete props.testId;
  props.className = cn(props.className, props.clsMap) as ClassName;
  delete props.clsMap;

  if (props.style)
    props.style = convertNumericStylesToPixels(props.style) as Styles;
  return props;
};

export const div = (
  props: BaseProps<HTMLDivElement> | null,
  ...child: Children[]
) => e("div", props && handleBaseProps(props), ...child);

export const span = (
  props: BaseProps<HTMLSpanElement> | null,
  ...child: Children[]
) => e("span", props && handleBaseProps(props), ...child);

type ImgProps = BaseProps<HTMLImageElement> & { src: string };
export const img = (props: ImgProps | null, ...child: Children[]) =>
  e("img", props && handleBaseProps(props), ...child);

export function fragment(...children: Children[]) {
  return React.createElement(React.Fragment, null, ...children);
}

type CheckboxProps = BaseProps<HTMLInputElement> & { checked: boolean };
export const checkbox = (props: CheckboxProps, ...child: Children[]) => {
  let mappedProps = handleBaseProps(props);
  //@ts-expect-error
  mappedProps.type = "checkbox";
  return e("input", handleBaseProps(props), ...child);
};

export const button = (
  props: BaseProps<HTMLButtonElement> | null,
  child: any
) => e("button", props && handleBaseProps(props), ...child);

export const e = React.createElement;

const cn = (
  cls: ClassName | undefined,
  clsMap: ClassMap | undefined
): string => {
  let className = cls || "";
  if (clsMap)
    className +=
      " " +
      keys(clsMap)
        .filter((key) => !!clsMap[key])
        .join(" ");
  return className;
};

const keys = <T>(val: T): (keyof T)[] => Object.keys(val) as (keyof T)[];
