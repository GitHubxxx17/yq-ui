import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { isFragment, isValidElement } from "../../utils";
import { colors } from "../tag/list";
import "./Tooltip.scss";
import {
  TooltipPlacement,
  animateTime,
  appearAnimation,
  disappearAnimation,
  getPos,
  trigger,
  triggerHandler,
} from "./TooltipHelper";

// 按钮基础属性
export interface TooltipProps
  extends Omit<React.AllHTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  title: React.ReactNode;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  placement?: TooltipPlacement;
  color?: string;
  arrow?: boolean;
  defaultOpen?: boolean;
  trigger?: trigger;
  open?: boolean;
  zIndex?: number;
  onOpenChange?: (open: boolean) => void;
}
//处理传入的子组件
const handleChild = (children: React.ReactNode) => {
  return isValidElement(children) && !isFragment(children) ? (
    children
  ) : (
    <span>{children}</span>
  );
};

function Tooltip(props: TooltipProps) {
  const {
    title,
    children,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    placement = "top",
    color,
    arrow = true,
    defaultOpen = false,
    trigger = "hover",
    open = false,
    zIndex = 100,
    onOpenChange,
    className,
    style,
    ...rest
  } = props;
  // 合并样式
  let patchStyle = { ...style, zIndex };
  // 显示隐藏
  const [visible, setVisible] = useState(open);
  // 类名数组
  let classNames: string[] = [];
  // 触发组件ref
  const triggerRef = useRef<HTMLDivElement>();
  // 文字提示ref
  const tooltipRef = useRef<HTMLDivElement>(null);
  // 文字提示箭头ref
  const arrowRef = useRef<HTMLDivElement>(null);
  // 文字提示动画实例
  const animate = useRef<Animation>();
  // 首次鼠标移入
  const [first, setFirst] = useState(true);
  // 背景颜色
  let bgColor = "";

  // 手动设置显示隐藏
  useEffect(() => {
    setVisible(open);
  }, [open]);

  // 触发显示和隐藏
  useEffect(() => {
    const tooltip = tooltipRef.current as HTMLDivElement;
    if (!triggerRef.current || !tooltip) return;
    //取消上一次的动画
    if (animate.current) {
      animate.current.cancel();
    }
    //如果有回调函数
    onOpenChange && onOpenChange(visible);
    if (visible) {
      //淡入
      tooltip.style.display = "block";
      setTimeout(() => {
        const trigger = triggerRef.current as HTMLDivElement;
        const arrow = arrowRef.current as HTMLDivElement;
        getPos(placement, trigger, tooltip, arrow);
        animate.current = tooltip.animate(appearAnimation, animateTime);
      });
    } else {
      //淡出
      animate.current = tooltip.animate(disappearAnimation, animateTime);
      animate.current.onfinish = () => {
        tooltip.style.display = "none";
      };
    }
  }, [visible]);

  //设置颜色
  if (color) {
    if (colors.includes(color)) {
      classNames.push(`yq-tooltip-${color}`);
    } else {
      bgColor = color;
    }
  }

  if (children) {
    // 如果传入的children是纯文本将其放入span中
    const child = handleChild(children);

    // 如果title为空则禁用
    if (!title) {
      triggerRef.current = undefined;
      return child;
    }

    // 处理显示
    const handleVisible = (e: React.MouseEvent<HTMLDivElement>) => {
      setVisible(!visible);
      if (!triggerRef.current) {
        setFirst(false);
        // debugger;
        triggerRef.current = e.target as HTMLDivElement;
      }
    };

    // 处理隐藏
    const handleHidden = () => {
      setVisible(false);
    };

    // 将child改造成触发器
    const Trigger = React.cloneElement(
      child,
      triggerHandler(trigger, handleVisible, handleHidden)
    );

    return (
      <>
        {!first &&
          ReactDOM.createPortal(
            <div
              ref={tooltipRef}
              className={["yq-tooltip", ...classNames, className].join(" ")}
              style={patchStyle}
              {...rest}
            >
              {arrow && (
                <div
                  ref={arrowRef}
                  className="yq-tooltip-arrow"
                  style={{ backgroundColor: bgColor }}
                ></div>
              )}
              <div
                className="yq-tooltip-content"
                style={{ backgroundColor: bgColor }}
              >
                {title}
              </div>
            </div>,
            document.body
          )}
        {Trigger}
      </>
    );
  }
}

export default Tooltip;
