import React from "react";
import "./Tag.scss";
// 标签基础样式
export interface TagBaseProps {
  children?: React.ReactNode;
  color?: string;
  classNames?: string[];
}

const Tag: React.FC<TagBaseProps> = (props) => {
  const { children, color, classNames = [] } = props;
  if (color) classNames.push(`yq-tag-${color}`);
  return (
    <span className={["yq-tag", ...classNames].join(" ")}>
      {children ?? "标 签"}
    </span>
  );
};

export default Tag;
