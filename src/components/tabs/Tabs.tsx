import { isValidReactNode } from "@/utils";
import "./Tabs.scss";

import React, { useEffect, useRef, useState } from "react";

// 标签类型
type tabItemType = {
  key: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
};

type tabBarExtraContentType = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

// 标签页基础属性
export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  classNames?: string[];
  items?: tabItemType[];
  onChange?: (key: string) => void;
  center?: boolean;
  defaultActiveKey?: string;
  indicator?: {
    size?: number | ((origin: number) => number);
    align: "start" | "center" | "end";
  };
  tabBarExtraContent?: React.ReactNode | tabBarExtraContentType;
  size?: "large" | "middle" | "small";
  TabPosition?: "left" | "right" | "top" | "bottom";
}

// 设置指示条的样式
const setLineStyle = (
  line: HTMLDivElement,
  tab: HTMLDivElement,
  indicator: TabsProps["indicator"],
  tabPosition: TabsProps["TabPosition"]
) => {
  if (isVertical(tabPosition)) {
    let width = indicator?.size
      ? typeof indicator?.size === "number"
        ? indicator?.size
        : indicator?.size(tab.offsetWidth)
      : tab.offsetWidth;

    if (indicator?.align == "center") {
      line.style.left = `${tab.offsetLeft + (tab.offsetWidth - width) / 2}px`;
    } else if (indicator?.align == "end") {
      line.style.left = `${tab.offsetLeft + tab.offsetWidth - width}px`;
    } else {
      line.style.left = `${tab.offsetLeft}px`;
    }
    line.style.width = `${width}px`;
  } else {
    let height = indicator?.size
      ? typeof indicator?.size === "number"
        ? indicator?.size
        : indicator?.size(tab.offsetHeight)
      : tab.offsetHeight;

    if (indicator?.align == "center") {
      line.style.top = `${tab.offsetTop + (tab.offsetHeight - height) / 2}px`;
    } else if (indicator?.align == "end") {
      line.style.top = `${tab.offsetTop + tab.offsetHeight - height}px`;
    } else {
      line.style.top = `${tab.offsetTop}px`;
    }
    line.style.height = `${height}px`;
  }
};

// 处理附加内容
const handleTabBarExtraContent = (
  tabBarExtraContent: TabsProps["tabBarExtraContent"]
): tabBarExtraContentType => {
  if (isValidReactNode(tabBarExtraContent)) {
    return {
      right: tabBarExtraContent,
    };
  } else {
    return tabBarExtraContent;
  }
};

// 处理坐标方向
const isVertical = (tabPosition: TabsProps["TabPosition"]) => {
  if (tabPosition == "top" || tabPosition == "bottom") return true;
  return false;
};

function Tabs(props: TabsProps) {
  const {
    items = [],
    onChange,
    center,
    classNames = [],
    defaultActiveKey = items[0]?.key || "",
    indicator,
    tabBarExtraContent,
    size = "middle",
    TabPosition = "top",
    ...rest
  } = props;

  // 当前选中的tab
  const [currentKey, setCurrentKey] = useState(defaultActiveKey);
  // tab列表
  const TabsRefs = useRef<HTMLDivElement[]>([]);
  // tab下方指示条
  const lineRef = useRef<HTMLDivElement>(null);
  // 导航栏
  const scrollListRef = useRef<HTMLDivElement>(null);
  // 滚动阴影显示
  const [scrollStart, setScrollStart] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);

  //点击tab列表
  const handleClickTabs = (item: tabItemType, index: number) => {
    if (item.disabled) return;
    setCurrentKey(item.key);
    setLineStyle(
      lineRef.current!,
      TabsRefs.current[index],
      indicator,
      TabPosition
    );
    onChange && onChange(item.key);
  };

  // 处理导航栏溢出滚动阴影
  const handleNavScroll = () => {
    const target = scrollListRef.current!;

    const scrollStart = isVertical(TabPosition)
      ? target.scrollLeft
      : target.scrollTop;
    const dis = isVertical(TabPosition)
      ? target.offsetWidth
      : target.offsetHeight;
    const scrollDis = isVertical(TabPosition)
      ? target.scrollWidth
      : target.scrollHeight;

    if (scrollStart == 0) {
      setScrollStart(false);
    } else {
      setScrollStart(true);
    }

    if (Math.abs(scrollStart + dis - scrollDis) < 0.6) {
      setScrollEnd(false);
    } else {
      setScrollEnd(true);
    }
  };

  useEffect(() => {
    const index = items.findIndex((item) => item.key == defaultActiveKey);
    handleClickTabs(items[index], index);
    handleNavScroll();
  }, []);

  const tabBarExtra = handleTabBarExtraContent(tabBarExtraContent);

  return (
    <div
      className={["yq-tabs", `yq-tabs-${TabPosition}`, ...classNames].join(" ")}
      {...rest}
    >
      <div className="yq-tabs-nav">
        {tabBarExtra.left && (
          <div className="yq-tabs-nav-extra-left">{tabBarExtra.left}</div>
        )}
        <div
          className={[
            "yq-tabs-nav-scroll",
            scrollStart ? "yq-tabs-scroll-start" : "",
            scrollEnd ? "yq-tabs-scroll-end" : "",
          ].join(" ")}
        >
          <div
            className={[
              "yq-tabs-nav-list",
              center ? "yq-tabs-nav-center" : "",
            ].join(" ")}
            ref={scrollListRef}
            onScroll={handleNavScroll}
          >
            {items.map((item, index) => (
              <div
                ref={(el) => {
                  el && TabsRefs.current.push(el);
                }}
                className={[
                  "yq-tabs-tab",
                  `yq-tabs-tab-${size}`,
                  currentKey == item.key ? "yq-tabs-tab-active" : "",
                  item.disabled ? "yq-tabs-tab-disable" : "",
                ].join(" ")}
                onClick={() => handleClickTabs(item, index)}
                key={item.key}
              >
                {item.icon && <span className="yq-tabs-icon">{item.icon}</span>}
                {item.label}
              </div>
            ))}
            <div className="yq-tabs-line" ref={lineRef}></div>
          </div>
        </div>
        {tabBarExtra.right && (
          <div className="yq-tabs-nav-extra-right">{tabBarExtra.right}</div>
        )}
      </div>
      <div className="yq-tabs-conent">
        {items.map((item, index) => (
          <div
            className={[
              "yq-tabs-tabpane",
              currentKey == item.key ? "yq-tabs-tabpane-active" : "",
            ].join(" ")}
            key={item.key}
          >
            {item.children}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
