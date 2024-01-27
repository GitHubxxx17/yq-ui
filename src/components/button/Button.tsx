import "./button.scss";

import React from "react";

export interface BaseButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  primary?: boolean;
}

function Button(props: BaseButtonProps) {
  const { type, disabled, children, className, styles, primary, size } = props;
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <button
      className={[
        "yq-ui-button",
        `yq-ui-button--${size}`,
        className,
        mode,
      ].join(" ")}
      style={styles}
      type={type}
      disabled={disabled}
    >
      {children ?? "按钮"}
    </button>
  );
}

export default Button;
