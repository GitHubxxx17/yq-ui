import type { Meta, StoryObj } from "@storybook/react";

import Popover from "./Popover";

const meta = {
  title: "Example/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {
    content: "Common Tag",
  },
};
