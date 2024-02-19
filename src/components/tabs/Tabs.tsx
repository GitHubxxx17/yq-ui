import { isValidReactNode } from "@/utils";
import "./Tabs.scss";

import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";

// 标签类型
type tabItemType = {
  key: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  closable?: boolean;
  closeIcon?: React.ReactNode;
};

// 附加内容类型
type tabBarExtraContentType = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

// 编辑模式下操作类型
type actionType = "add" | "remove";

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
  type?: "line" | "card" | "editable-card";
  activeKey?: string;
  addIcon?: React.ReactNode;
  hideAdd?: boolean;
  onEdit?: (
    e: React.MouseEvent | React.KeyboardEvent | string,
    action: actionType
  ) => void;
  onTabClick?: (key: string, event: React.MouseEvent) => void;
  tabBarGutter?: number;
  onTabScroll?: (direction: "left" | "right" | "top" | "bottom") => void;
  tabBarStyle?: React.CSSProperties;
  destroyInactiveTabPane?: boolean;
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

// 调整标签间隙
const TabBarGutterStyle = (
  tabPosition: TabsProps["TabPosition"],
  tabBarGutter: number | undefined
): React.CSSProperties => {
  if (!tabBarGutter) return {};
  if (isVertical(tabPosition)) {
    return {
      marginLeft: tabBarGutter,
    };
  } else {
    return {
      marginTop: tabBarGutter,
    };
  }
};

// 调整编辑区域高度
const editableHeight = (
  tabPosition: TabsProps["TabPosition"],
  size: TabsProps["size"]
): React.CSSProperties => {
  if (size == "small") {
    if (isVertical(tabPosition)) {
      return {
        padding: "10px 0",
      };
    } else {
      return {
        height: "34px",
      };
    }
  }

  return {};
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
    type = "line",
    activeKey = defaultActiveKey,
    addIcon,
    hideAdd,
    onEdit,
    onTabClick,
    tabBarGutter,
    onTabScroll,
    tabBarStyle,
    destroyInactiveTabPane,
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
  // 处理后的附加内容
  const tabBarExtra = handleTabBarExtraContent(tabBarExtraContent);
  //  可编辑卡片
  const newtype = type == "editable-card" ? "card" : type;

  // 受外部控制切换标签
  useEffect(() => {
    const index = items.findIndex((item) => item.key == activeKey);
    handleClickTabs(items[index], index);
  }, [activeKey]);

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

  // 处理自定义编辑事件
  const handleEdit = (
    e: React.MouseEvent | React.KeyboardEvent | string,
    action: actionType
  ) => {
    onEdit && onEdit(e, action);
    setTimeout(() => {
      handleNavScroll();
    });
  };

  return (
    <div
      className={["yq-tabs", `yq-tabs-${TabPosition}`, ...classNames].join(" ")}
      {...rest}
    >
      <div className="yq-tabs-nav" style={tabBarStyle}>
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
            onScroll={() => {
              onTabScroll && onTabScroll(TabPosition);
              handleNavScroll();
            }}
          >
            <div className="yq-tabs-nav-list_inner">
              {items.map((item, index) => (
                <div
                  ref={(el) => {
                    if (el) {
                      TabsRefs.current[index] = el;
                    }
                  }}
                  className={[
                    "yq-tabs-tab",
                    `yq-tabs-tab-${size}`,
                    `yq-tabs-tab-${newtype}`,
                    currentKey == item.key ? "yq-tabs-tab-active" : "",
                    item.disabled ? "yq-tabs-tab-disable" : "",
                  ].join(" ")}
                  onClick={(e) => {
                    onTabClick && onTabClick(item.key, e);
                    handleClickTabs(item, index);
                  }}
                  key={item.key}
                  style={
                    index != 0
                      ? TabBarGutterStyle(TabPosition, tabBarGutter)
                      : {}
                  }
                >
                  {item.icon && (
                    <span className="yq-tabs-icon">{item.icon}</span>
                  )}
                  {item.label}
                  {((type == "editable-card" &&
                    typeof item.closable === "undefined") ||
                    item.closable) && (
                    <span
                      className="yq-tabs-closable"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item.key, "remove");
                      }}
                    >
                      {item.closeIcon ?? <CloseOutlined />}
                    </span>
                  )}
                </div>
              ))}
              <div
                className="yq-tabs-line"
                style={{ display: newtype == "card" ? "none" : "" }}
                ref={lineRef}
              ></div>
            </div>
          </div>
        </div>
        {tabBarExtra.right && (
          <div className="yq-tabs-nav-extra-right">{tabBarExtra.right}</div>
        )}
        {!hideAdd && type == "editable-card" && (
          <div
            className="yq-tabs-nav-editable"
            onClick={(e) => handleEdit(e, "add")}
            style={editableHeight(TabPosition, size)}
          >
            {addIcon ?? <PlusOutlined />}
          </div>
        )}
      </div>
      <div className="yq-tabs-conent">
        {destroyInactiveTabPane && (
          <div
            className={["yq-tabs-tabpane", "yq-tabs-tabpane-active"].join(" ")}
          >
            {items.find((item) => currentKey == item.key)?.children}
          </div>
        )}
        {!destroyInactiveTabPane &&
          items.map((item) => (
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
