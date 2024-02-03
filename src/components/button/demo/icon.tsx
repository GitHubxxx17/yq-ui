import { Button } from "@/index";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      &nbsp;
      <Button type="primary" icon={<SearchOutlined />}>
        搜索
      </Button>
      &nbsp;
      <Button type="primary" icon={<SearchOutlined />}></Button>
    </>
  );
};

export default App;
