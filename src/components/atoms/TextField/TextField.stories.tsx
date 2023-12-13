import { TextField } from "./TextField";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextField> = {
  component: TextField,
  args: {
    label: "label",
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  args: {
    placeholder: "Write something...",
  },
};
