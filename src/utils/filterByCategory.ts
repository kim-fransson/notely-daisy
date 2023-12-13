export const filterByCategory = (note: Note, category?: Category) => {
  if (!category || category === "all") {
    return true;
  }
  return note.category === category;
};
