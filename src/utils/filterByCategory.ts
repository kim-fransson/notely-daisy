export const filterByCategory = (note: Note, category?: Category) => {
  if (!category) {
    return true;
  }
  return note.category === category;
};
