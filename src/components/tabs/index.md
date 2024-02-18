---
category: Components
title: Tabs
subtitle: 标签页
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 数据展示
  order: 2
---

## 介绍

选项卡切换组件。

## 代码演示

默认选中第一项。
<code src="./demo/base.tsx">基础用法</code>
禁用某一项。
<code src="./demo/disable.tsx">禁用</code>
标签居中展示。
<code src="./demo/center.tsx">居中</code>
有图标的标签。
<code src="./demo/icon.tsx">图标</code>
设置 indicator 属性，自定义指示条宽度和对齐方式。
<code src="./demo/indicator.tsx">指示条</code>
可以左右、上下滑动，容纳更多标签。
<code src="./demo/slide.tsx">滑动</code>
可以在页签两边添加附加操作。
<code src="./demo/tabBarExtraContent.tsx">附加内容</code>
大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。
<code src="./demo/size.tsx">大小</code>
有四个位置，tabPosition="left|right|top|bottom"。在移动端下，left|right 会自动切换成 top。
<code src="./demo/tabPosition.tsx">位置</code>

## API

| 属性                   | 类型                                                                                   | 默认值                           | 必填  | 说明                                                     |
| ---------------------- | -------------------------------------------------------------------------------------- | -------------------------------- | ----- | -------------------------------------------------------- |
| activeKey              | string                                                                                 | -                                | false | 当前激活 tab 面板的 key                                  |
| addIcon                | ReactNode                                                                              | -                                | false | 自定义添加按钮                                           |
| animated               | boolean\| { inkBar: boolean, tabPane: boolean }                                        | { inkBar: true, tabPane: false } | false | 是否使用动画切换 Tabs                                    |
| center                 | boolean                                                                                | false                            | false | 标签居中展示                                             |
| defaultActiveKey       | string                                                                                 | "0"                              | false | 初始化选中面板的 key，如果没有设置 activeKey             |
| hideAdd                | boolean                                                                                | false                            | false | 是否隐藏加号图标，在 `type="editable-card"` 时有效       |
| indicator              | { size?: number \| (origin: number) => number; align: `start` \| `center` \| `end`; }  | -                                | false | 自定义指示条的长度和对齐方式                             |
| items                  | [TabItemType](#tabitemtype)                                                            | []                               | false | 配置选项卡内容                                           |
| moreIcon               | ReactNode                                                                              | &lt;EllipsisOutlined />          | false | 自定义折叠 icon                                          |
| popupClassName         | string                                                                                 | -                                | false | 更多菜单的 `className`                                   |
| renderTabBar           | (props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement | -                                | false | 替换 TabBar，用于二次封装标签头                          |
| size                   | string                                                                                 | `middle`                         | false | 大小，提供 `large` `middle` 和 `small` 三种大小          |
| tabBarExtraContent     | ReactNode \| {left?: ReactNode, right?: ReactNode}                                     | -                                | false | tab bar 上额外的元素                                     |
| tabBarGutter           | number                                                                                 | -                                | false | tabs 之间的间隙                                          |
| tabBarStyle            | CSSProperties                                                                          | -                                | false | tab bar 的样式对象                                       |
| tabPosition            | string                                                                                 | `top`                            | false | 页签位置，可选值有 `top` `right` `bottom` `left`         |
| destroyInactiveTabPane | boolean                                                                                | false                            | false | 被隐藏时是否销毁 DOM 结构                                |
| type                   | string                                                                                 | `line`                           | false | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 |
| onChange               | (activeKey: string) => void                                                            | -                                | false | 切换面板的回调                                           |
| onEdit                 | (action === 'add' ? event : targetKey, action) => void                                 | -                                | false | 新增和删除页签的回调，在 `type="editable-card"` 时有效   |
| onTabClick             | (key: string, event: MouseEvent) => void                                               | -                                | false | tab 被点击的回调                                         |
| onTabScroll            | ({ direction: `left` \| `right` \| `top` \| `bottom` }) => void                        | -                                | false | tab 滚动时触发                                           |

### TabItemType

| 属性                   | 类型      | 默认值 | 必填  | 说明                                                                                             |
| ---------------------- | --------- | ------ | ----- | ------------------------------------------------------------------------------------------------ |
| closeIcon              | ReactNode | -      | false | 自定义关闭图标，在 `type="editable-card"` 时有效。5.7.0：设置为 `null` 或 `false` 时隐藏关闭按钮 |
| destroyInactiveTabPane | boolean   | false  | false | 被隐藏时是否销毁 DOM 结构                                                                        |
| disabled               | boolean   | false  | false | 禁用某一项                                                                                       |
| forceRender            | boolean   | false  | false | 被隐藏时是否渲染 DOM 结构                                                                        |
| key                    | string    | -      | true  | 对应 activeKey                                                                                   |
| label                  | ReactNode | -      | true  | 选项卡头显示文字                                                                                 |
| icon                   | ReactNode | -      | false | 选项卡头显示图标                                                                                 |
| children               | ReactNode | -      | true  | 选项卡头显示内容                                                                                 |
| closable               | boolean   | true   | false | 是否显示选项卡的关闭按钮，在 `type="editable-card"` 时有效                                       |
