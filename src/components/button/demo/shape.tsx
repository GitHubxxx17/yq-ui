import { Button } from "@/index";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <Button type="primary" shape="default">
        按 钮
      </Button>
      &nbsp;
      <Button type="primary" shape="circle">
        A
      </Button>
      &nbsp;
      <Button type="primary" shape="round">
        按 钮
      </Button>
    </>
  );
};

export default App;
