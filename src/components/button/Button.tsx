import "./button.scss";

import React from "react";

// 按钮基础属性
interface BaseButtonProps {
  type?: "primary" | "dashed" | "link" | "text" | "default";
  disabled?: boolean;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  size?: "small" | "default" | "large";
  classNames?: string[];
  danger?: boolean;
  ghost?: boolean;
  block?: boolean;
  shape?: "default" | "circle" | "round";
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
  target?: string;
  htmlType?: "submit" | "button" | "reset";
}

function Button(props: ButtonProps) {
  const {
    type = "default",
    disabled,
    children,
    className,
    styles,
    size = "default",
    onClick,
    danger,
    ghost,
    block,
    classNames = [],
    href,
    target,
    htmlType,
    shape = "default",
    ...rest
  } = props;

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    console.log("点击按钮");
    onClick?.(e);
  };

  if (danger) {
    classNames.push("yq-ui-btn--danger");
  }

  if (ghost) {
    classNames.push("yq-ui-btn--ghost");
  }

  if (block) {
    classNames.push("yq-ui-btn--block");
  }

  if (shape != "default") {
    classNames.push(`yq-ui-btn--${shape}`);
  }

  if (size != "default") {
    classNames.push(`yq-ui-btn--${size}`);
  }

  if (href) {
    if (disabled) {
      classNames.push("yq-ui-btn--disabled");
    }
    return (
      <a
        className={[
          "yq-ui-btn",
          `yq-ui-btn--${type}`,
          className,
          ...classNames,
        ].join(" ")}
        style={styles}
        href={href}
        target={target}
        onClick={handleClick}
        {...rest}
      >
        {children ?? "按 钮"}
      </a>
    );
  }

  return (
    <button
      className={[
        "yq-ui-btn",
        `yq-ui-btn--${type}`,
        className,
        ...classNames,
      ].join(" ")}
      style={styles}
      disabled={disabled}
      onClick={handleClick}
      type={htmlType}
      {...rest}
    >
      {children ?? "按 钮"}
    </button>
  );
}

export default Button;
