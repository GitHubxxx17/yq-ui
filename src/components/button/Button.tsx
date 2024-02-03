import { isNumber, isObject } from "@/utils/index";
import "./button.scss";

import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

type loadingType = {
  loading: boolean;
  delay: number;
};

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
  icon?: React.ReactNode;
  loading?: boolean | { delay?: number };
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

// 处理加载数据
const handleLoadingProps = (
  loading: BaseButtonProps["loading"]
): loadingType => {
  // 是否为对象
  if (loading && isObject(loading)) {
    let delay = (loading as loadingType)?.delay;
    delay = isNumber(delay) ? delay : 0;
    return {
      loading: delay! <= 0,
      delay,
    };
  }
  return {
    loading: !!loading,
    delay: 0,
  };
};

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
    icon,
    loading,
    ...rest
  } = props;
  //内部加载
  const [innerLoading, setInnerLoading] = useState(false);
  const loadingProps = handleLoadingProps(loading);

  //延迟加载
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (loadingProps.delay > 0) {
      setTimeout(() => {
        timer = null;
        setInnerLoading(false);
      }, loadingProps.delay);
    } else {
      setInnerLoading(loadingProps.loading);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [loadingProps]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    //加载过程取消点击事件
    if (innerLoading) {
      e.preventDefault();
      return;
    }
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

  if (!children) {
    classNames.push("yq-ui-btn-only");
  }

  if (innerLoading) {
    classNames.push("yq-ui-btn-loading");
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
        {icon && <span className={"yq-ui-btn-icon"}>{icon}</span>}
        <span>{children}</span>
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
      {!loading && icon && <span className={"yq-ui-btn-icon"}>{icon}</span>}
      {loading && (
        <span className={"yq-ui-btn-icon"}>
          <LoadingOutlined />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}

export default Button;
