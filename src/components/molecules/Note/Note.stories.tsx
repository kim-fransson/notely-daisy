import { Note } from "./Note";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Note> = {
  component: Note,
  parameters: {},
  argTypes: {
    onArchiveNote: { action: "archive note" },
    onDeleteNote: { action: "delete note" },
    onEditNote: { action: "edit note" },
  },
};
export default meta;

type Story = StoryObj<typeof Note>;

export const Playground: Story = {
  args: {
    note: {
      id: "1",
      title: "Title",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      category: "personal",
      state: "inbox",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
};

export const Personal: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      category: "personal",
    } as Note,
  },
};

export const Business: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      category: "business",
    } as Note,
  },
};

export const Home: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      category: "home",
    } as Note,
  },
};

export const NoDescription: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      description: undefined,
    } as Note,
  },
};

export const LongDescription: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi uti.",
    } as Note,
  },
};

export const Archived: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      state: "archived",
    } as Note,
  },
};
