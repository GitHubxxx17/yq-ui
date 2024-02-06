import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { isFragment, isValidElement } from "../../utils";
import "./Tooltip.scss";

// 位置类型声明
export type TooltipPlacement =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";

// 按钮基础属性
export interface TooltipProps
  extends Omit<React.AllHTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  title: React.ReactNode;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  placement?: TooltipPlacement;
}

// 动画执行时间
const animateTime = 100;

// 淡入动画效果
const appearAnimation = [
  { opacity: 0, transform: "scale(0.7)" },
  { opacity: 1, transform: "scale(1)" },
];
// 淡出动画效果
const disappearAnimation = [
  { opacity: 1, transform: "scale(1)" },
  { opacity: 0, transform: "scale(0.7)" },
];

//处理传入的子组件
const handleChild = (children: React.ReactNode) => {
  return isValidElement(children) && !isFragment(children) ? (
    children
  ) : (
    <span>{children}</span>
  );
};

const getPos = (
  place: TooltipPlacement,
  trigger: HTMLDivElement,
  tooltip: HTMLDivElement
) => {
  const {} = trigger.getBoundingClientRect();
};

function getElementTop(element: any) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

function getElementLeft(element: any) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

function Tooltip(props: TooltipProps) {
  const {
    title,
    children,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    placement = "top",
    className,
    style,
    ...rest
  } = props;
  // 合并样式
  let [patchStyle, setPatchStyle] = useState(style);
  // 显示隐藏
  const [visible, setVisible] = useState(false);
  // 类名数组
  let classNames: string[] = [];
  // 触发组件ref
  const triggerRef = useRef<HTMLDivElement>();
  // 文字提示ref
  const tooltipRef = useRef<HTMLDivElement>(null);
  // 文字提示动画实例
  const animate = useRef<Animation>();
  //
  const [first, setFirst] = useState(true);

  // 触发显示和隐藏
  useEffect(() => {
    const dom = tooltipRef.current as HTMLDivElement;
    if (!triggerRef.current || !dom) return;
    //取消上一次的动画
    if (animate.current) {
      animate.current.cancel();
    }
    if (visible) {
      //淡入
      const { x } = triggerRef.current.getBoundingClientRect();
      dom.style.left = `${x}px`;
      dom.style.display = "block";
      animate.current = dom.animate(appearAnimation, animateTime);
    } else {
      //淡出
      animate.current = dom.animate(disappearAnimation, animateTime);
      animate.current.onfinish = () => {
        dom.style.display = "none";
      };
    }
  }, [visible]);

  if (children) {
    // 如果传入的children是纯文本将其放入span中
    const child = handleChild(children);

    // 将child改造成触发器
    const Trigger = React.cloneElement(child, {
      onPointerEnter: (e: React.MouseEvent<HTMLDivElement>) => {
        setVisible(true);
        if (!triggerRef.current) {
          setFirst(false);

          setTimeout(() => {
            //初始化dom节点的位置
            triggerRef.current = e.target as HTMLDivElement;
            const {
              top,
              left,
              width: tgWidth,
            } = triggerRef.current.getBoundingClientRect();
            let offsetTop = triggerRef.current.offsetTop;
            let offsetLeft = triggerRef.current.offsetLeft;
            console.log(
              top,
              left,
              offsetTop,
              offsetLeft,
              getElementTop(triggerRef.current),
              getElementLeft(triggerRef.current)
            );

            const dom = tooltipRef.current as HTMLDivElement;
            if (!dom) return;
            // 让dom节点渲染到页面并获取高度和宽度
            dom.style.transform = "scale(1)";
            dom.style.display = "block";
            let scrollTop = document.documentElement.scrollTop;
            let scrollLeft = document.documentElement.scrollLeft;
            const { height, width } = dom.getBoundingClientRect();

            dom.style.transform = "";
            dom.style.top = `${offsetTop - height - 10}px`;
            dom.style.left = `${left + (tgWidth - width) / 2}px`;
          });
        }
      },
      onPointerLeave: () => {
        setVisible(false);
      },
    });

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
              <div className="yq-tooltip-arrow"></div>
              <div className="yq-tooltip-conent">{title}</div>
            </div>,
            document.body
          )}
        {Trigger}
      </>
    );
  }
}

export default Tooltip;
