type Category = "all" | "business" | "personal" | "home";

type CategoryColorMap = {
  all: "orange";
  personal: "orange";
  home: "green";
  business: "purple";
};

type NoteState = "inbox" | "archived";

type Note = {
  id: string;
  title: string;
  category: Category;
  description?: string;
  createdAt: string;
  updatedAt: string;
  state: NoteState;
};

type NoteKeys = keyof Note;

type NoteAction =
  | AddNoteAction
  | DeleteNoteAction
  | UpdateNoteAction
  | ArchiveNoteAction;

type AddNoteAction = {
  type: "ADD_NOTE";
  note: Note;
};

type UpdateNoteAction = {
  type: "UPDATE_NOTE";
  note: Omit<Note, "createdAt" | "state">;
};

type DeleteNoteAction = {
  type: "DELETE_NOTE";
  noteId: string;
};

type ArchiveNoteAction = {
  type: "TOGGLE_ARCHIVE_NOTE";
  noteId: string;
};
