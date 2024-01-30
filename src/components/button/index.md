# Button

按钮是一种命令组件，可发起一个即时操作。

基本用法
按钮分为 主要按钮、次要按钮、虚线按钮、链接按钮和文本按钮五种。

```js
type?: "primary" | "dashed" | "link" | "text";
```

```jsx
import React from 'react';

const App: React.FC = () => (
    <button>按钮</button>
);

export default App;
```
