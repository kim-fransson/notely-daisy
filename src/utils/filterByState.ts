export const filterByState = (note: Note, state?: NoteState) => {
  if (!state) {
    return true;
  }
  return note.state === state;
};
