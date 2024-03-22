import { Button, Tooltip } from "@/index";
import React from "react";

const App: React.FC = () => (
  <div>
    <Tooltip title="prompt text">
      <Button>鼠标移入</Button>
    </Tooltip>
    <Tooltip title="prompt text" trigger="click">
      <Button>鼠标点击</Button>
    </Tooltip>
    <Tooltip title="prompt text" trigger="click" defaultOpen>
      <Button>默认打开</Button>
    </Tooltip>
  </div>
);

export default App;
