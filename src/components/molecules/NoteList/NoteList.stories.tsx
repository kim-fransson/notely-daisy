import { NoteList } from "./NoteList";
import type { Meta, StoryObj } from "@storybook/react";

import * as NoteStories from "@components/molecules/Note/Note.stories";
import { NotesContext } from "@/contexts";
import { useReducer } from "react";
import { notesReducer } from "@/reducers";

const mockedNotes = [
  { ...NoteStories.Business.args!.note, id: "1", title: "Note 1" },
  { ...NoteStories.Home.args!.note, id: "2", title: "Note 2" },
  { ...NoteStories.Personal.args!.note, id: "3", title: "Note 3" },
  { ...NoteStories.NoDescription.args!.note, id: "4", title: "Note 4" },
  { ...NoteStories.Archived.args!.note, id: "5", title: "Note 5" },
  { ...NoteStories.LongDescription.args!.note, id: "6", title: "Note 6" },
] as Note[];

const meta: Meta<typeof NoteList> = {
  component: NoteList,
  parameters: {},
  argTypes: {},
  decorators: [
    (Story) => {
      const [notes, dispatch] = useReducer(notesReducer, mockedNotes);
      return (
        <NotesContext.Provider value={{ notes, dispatch }}>
          <Story />
        </NotesContext.Provider>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof NoteList>;

export const Playground: Story = {
  args: {},
};
