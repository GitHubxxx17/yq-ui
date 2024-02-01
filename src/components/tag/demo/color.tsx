import { Tag } from "@/index";
import React from "react";

const App: React.FC = () => {
  const colors = [
    "blue",
    "red",
    "green",
    "purple",
    "cyan",
    "magenta",
    "pink",
    "orange",
    "yellow",
    "volcano",
    "geekblue",
    "gold",
    "lime",
  ];
  return (
    <>
      {colors.map((color: string) => (
        <Tag color={color}>{color}</Tag>
      ))}
    </>
  );
};

export default App;
