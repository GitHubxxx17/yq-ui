---
category: Components
title: Button
subtitle: 按钮
toc: content
nav:
  title: 组件
  order: 0
group:
  title: 通用
  order: 1
---

## 介绍

按钮是一种命令组件，可发起一个即时操作。

## 代码演示

按钮分为 主要按钮、默认按钮、虚线按钮、链接按钮和文本按钮五种。

<code src="./demo/base.tsx">基础用法</code>

按钮有大、中、小三种尺寸。
通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。
<code src="./demo/size.tsx">按钮尺寸</code>

## APi

<!-- 会生成api表格 -->

| 属性 | 类型                                                   | 默认值    | 必填  | 说明     |
| ---- | ------------------------------------------------------ | --------- | ----- | -------- |
| type | `primary` \| `default` \| `dashed` \| `link` \| `text` | `default` | false | 按钮类型 |
| size | `small` \| `default` \| `large`                        | `default` | false | 按钮尺寸 |
