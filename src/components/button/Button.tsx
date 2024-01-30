import "./button.scss";

import React from "react";

// 按钮基础属性
interface BaseButtonProps {
  type?: "primary" | "dashed" | "link" | "text" | "default";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  size?: "small" | "default" | "large";
}

// 原生按钮属性
type MergedHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement> &
    React.AnchorHTMLAttributes<HTMLElement>,
  "type"
>;

// 按钮属性
export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
  href?: string;
  htmlType?: "submit" | "button" | "reset";
}

function Button(props: ButtonProps) {
  const {
    type = "default",
    disabled,
    children,
    className,
    styles,
    size,
    onClick,
    ...rest
  } = props;

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    console.log("点击按钮");
    onClick?.(e);
  };

  return (
    <button
      className={[
        "yq-ui-btn",
        `yq-ui-btn--size-${size}`,
        `yq-ui-btn--${type}`,
        className,
      ].join(" ")}
      style={styles}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children ?? "按 钮"}
    </button>
  );
}

export default Button;
