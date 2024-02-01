---
category: Components
title: Tag
subtitle: 标签
toc: content
nav:
  title: 组件
  order: 1
group:
  title: 数据展示
  order: 2
---

## 介绍

进行标记和分类的小标签。

- 用于标记事物的属性和维度。
- 进行分类。

## 代码演示

<code src="./demo/base.tsx">基础用法</code>
<code src="./demo/color.tsx">多彩标签</code>

## API

| 属性     | 类型        | 默认值 | 必填  | 说明                                                       |
| -------- | ----------- | ------ | ----- | ---------------------------------------------------------- |
| color    | string      | -      | false | 标签色                                                     |
| bordered | boolean     | `true` | false | 是否有边框                                                 |
| onClose  | (e) => void | -      | false | 关闭时的回调（可通过 `e.preventDefault()` 来阻止默认行为） |
