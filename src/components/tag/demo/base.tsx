import { Tag } from "@/index";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <Tag>Tag</Tag>&nbsp;
      <Tag>
        <a href="https://ant-design.antgroup.com/components/tag-cn#api">link</a>
      </Tag>
      &nbsp;
      <Tag>可关闭标签</Tag>
    </>
  );
};

export default App;
