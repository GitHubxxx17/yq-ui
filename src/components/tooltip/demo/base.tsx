import { Button, Tooltip } from "@/index";
import React from "react";

const App: React.FC = () => (
  <Tooltip title="prompt text">
    <Button>Tooltip</Button>
  </Tooltip>
);

export default App;
