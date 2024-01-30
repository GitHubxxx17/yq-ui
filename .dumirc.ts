import { defineConfig } from "dumi";

export default defineConfig({
  outputPath: "docs-dist",
  resolve: {
    atomDirs: [{ type: "component", dir: "src/components" }],
  },
  themeConfig: {
    name: "yuqi-ui",
  },
});
