import "./Popover.scss";

import React from "react";

// 按钮基础属性
interface PopoverProps {
  classNames?: string[];
  content?: React.ReactNode;
}

function Popover(props: PopoverProps) {
  const { content, classNames = [] } = props;

  return (
    <div className={["yq-popover", ...classNames].join(" ")}>
      <div className="yq-popover-arrow"></div>
      <div className="yq-popover-conent">{content}</div>
    </div>
  );
}

export default Popover;
