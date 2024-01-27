import React from "react";

export interface LabelProps {
  className?: string;
  color?: "red" | "blue";
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function Label(props: LabelProps) {
  const { className, color, style, children } = props;

  const colorStyle = () => {
    return {
      color: color,
    };
  };

  const newStyle: React.CSSProperties = { ...style, ...colorStyle };

  return (
    <div className={className} style={newStyle}>
      {children ?? "标签"}
    </div>
  );
}

export default Label;
