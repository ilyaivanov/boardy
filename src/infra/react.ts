import React from "react";

type BaseProps<T> = React.DOMAttributes<T> & {
  className?: string;
  testId?: string;
};

const handleBaseProps = <T>(props: BaseProps<T>) => {
  //@ts-expect-error
  props["data-testid"] = props.testId;
  delete props.testId;
  return props;
};

export const div = (props: BaseProps<HTMLDivElement> | null, ...child: any) =>
  e("div", props && handleBaseProps(props), ...child);

export const button = (
  props: BaseProps<HTMLButtonElement> | null,
  child: any
) => e("button", props && handleBaseProps(props), ...child);

export const e = React.createElement;
