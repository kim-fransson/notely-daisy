import { createContext } from "react";

export const NotesContext = createContext<{
  notes: Note[];
  dispatch: React.Dispatch<NoteAction>;
}>({
  notes: [],
  dispatch: () => {
    throw new Error(
      "NotesDispatchContext used without a provider! Make sure to use NotesProvider.",
    );
  },
});
