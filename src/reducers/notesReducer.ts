export const notesReducer = (notes: Note[], action: NoteAction): Note[] => {
  switch (action.type) {
    case "ADD_NOTE": {
      return [...notes, { ...action.note }];
    }

    case "UPDATE_NOTE": {
      return notes.map((note) =>
        note.id === action.note.id ? { ...note, ...action.note } : note,
      );
    }

    case "DELETE_NOTE": {
      return notes.filter((note) => note.id !== action.noteId);
    }

    case "TOGGLE_ARCHIVE_NOTE": {
      return notes.map((note) =>
        note.id === action.noteId
          ? { ...note, state: note.state === "archived" ? "inbox" : "archived" }
          : note,
      );
    }
  }
};
