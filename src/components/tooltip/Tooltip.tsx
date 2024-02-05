import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { isFragment, isValidElement } from "../../utils";
import "./Tooltip.scss";

// 按钮基础属性
export interface TooltipProps
  extends Omit<React.AllHTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  title: React.ReactNode;
}

function Tooltip(props: TooltipProps) {
  const { title, children, className, style, ...rest } = props;
  let [patchStyle, setPatchStyle] = useState(style);
  const [visible, setVisible] = useState(false);
  let [classNames, setClassNames] = useState<string[]>([]);
  const triggerRef = useRef<HTMLDivElement>();
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      setClassNames([...classNames, "yq-tooltip-visible"]);
    } else {
      setClassNames((prev) => {
        return prev.filter((name) => name != "yq-tooltip-visible");
      });
    }
  }, [visible]);

  if (children) {
    // 如果传入的children是纯文本将其放入span中
    const child =
      isValidElement(children) && !isFragment(children) ? (
        children
      ) : (
        <span>{children}</span>
      );

    // 将child改造成触发器
    const Trigger = React.cloneElement(child, {
      onPointerEnter: (e: React.MouseEvent<HTMLDivElement>) => {
        setVisible(true);
        if (!triggerRef.current) {
          triggerRef.current = e.target as HTMLDivElement;
          const {
            top,
            left,
            width: tgWidth,
          } = triggerRef.current.getBoundingClientRect();
          setTimeout(() => {
            const { height, width } =
              tooltipRef.current!.getBoundingClientRect();
            setPatchStyle({
              ...patchStyle,
              top: `${top - height - 10}px`,
              left: `${left + (tgWidth - width) / 2}px`,
            });
          });
        }
      },
      onPointerLeave: () => {
        setVisible(false);
      },
    });
    return (
      <>
        {ReactDOM.createPortal(
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

  return (
    <div
      className={["yq-tooltip", ...classNames, className].join(" ")}
      style={style}
      {...rest}
    >
      <div className="yq-tooltip-arrow"></div>
      <div className="yq-tooltip-conent">{title}</div>
    </div>
  );
}

export default Tooltip;
