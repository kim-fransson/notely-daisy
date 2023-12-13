import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    /* onSearch: {
      action: "search",
    }, */
    onAdd: {
      action: "add",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Playground: Story = {
  args: {},
};
