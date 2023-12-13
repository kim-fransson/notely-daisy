import { Textarea } from "./Textarea";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  args: {
    label: "label",
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {
  args: {
    placeholder: "Write something...",
  },
};
