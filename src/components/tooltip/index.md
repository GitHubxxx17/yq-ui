---
category: Components
title: tooltip
subtitle: 文字提示
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 数据展示
  order: 3
---

## 介绍

简单的文字提示气泡框。

## 代码演示

<code src="./demo/base.tsx">基础用法</code>

## API

| 属性  | 类型                         | 默认值 | 必填 | 说明     |
| ----- | ---------------------------- | ------ | ---- | -------- |
| title | ReactNode \| () => ReactNode | -      | true | 提示文字 |

### 共同的 API

以下 API 为 Tooltip、Popconfirm、Popover 共享的 API。
| 属性 | 类型 | 默认值 | 必填 | 说明 |
| ----- | ------ | ------ | ----- | ------ |
| arrow | boolean \| { pointAtCenter: boolean } | true | false | 修改箭头的显示状态以及修改箭头是否指向目标元素中心 |
| autoAdjustOverflow | boolean | true | false | 气泡被遮挡时自动调整位置 |
| color | string | - | false | 背景颜色 |
| defaultOpen | boolean | false | false | 默认是否显隐 |
| destroyTooltipOnHide| boolean | false | false | 关闭后是否销毁 Tooltip |
| fresh | boolean | false | false | 默认情况下，Tooltip 在关闭时会缓存内容。设置该属性后会始终保持更新 |
| getPopupContainer | (triggerNode: HTMLElement) => HTMLElement | () => document.body | false | 浮层渲染父节点，默认渲染到 body 上 |
| mouseEnterDelay | number | 0.1 | false | 鼠标移入后延时多少才显示 Tooltip，单位：秒 |
| mouseLeaveDelay | number | 0.1 | false | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 |
| overlayClassName | string | - | false | 卡片类名 |
| overlayStyle | object | - | false | 卡片样式 |
| overlayInnerStyle | object | - | false | 卡片内容区域的样式对象 |
| placement | `top`\| `left`\| `right`\| `bottom`\| `topLeft`\|`topRight`\|`bottomLeft`\|`bottomRight`\|`leftTop`\|`leftBottom`\|`rightTop`\|`rightBottom` | `top` | false | 气泡框位置 |
| trigger | `hover` \| `focus` \| `click` \| `contextMenu` | `hover` | false | 触发行为 |
| open | boolean | false | false | 用于手动控制浮层显隐 |
| zIndex | number | - | false | 设置 Tooltip 的 `z-index` |
| onOpenChange | (open: boolean) => void | - | false | 显示隐藏的回调 |
