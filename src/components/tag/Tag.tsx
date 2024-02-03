import React from "react";
import CheckableTag from "./CheckableTag";
import "./Tag.scss";
// 标签基础样式
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  color?: string;
  classNames?: string[];
  styles?: React.CSSProperties;
  bordered?: boolean;
}

export interface TagType
  extends React.ForwardRefExoticComponent<
    TagProps & React.RefAttributes<HTMLElement>
  > {
  CheckableTag: typeof CheckableTag;
}

const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  props,
  ref
) => {
  const {
    children,
    color,
    classNames = [],
    styles,
    bordered = true,
    ...rest
  } = props;
  if (color != "default") classNames.push(`yq-tag-${color}`);
  if (!bordered) classNames.push(`yq-tag-none-bordered`);
  return (
    <span
      ref={ref}
      className={["yq-tag", ...classNames].join(" ")}
      style={styles}
      {...rest}
    >
      {children ?? "标 签"}
    </span>
  );
};
const Tag = React.forwardRef<HTMLSpanElement, TagProps>(InternalTag) as TagType;
// 可选择标签
Tag.CheckableTag = CheckableTag;

export default Tag;
