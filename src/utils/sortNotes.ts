export const sortNotes = (n1: Note, n2: Note) => {
  if (n1.state === "archived" && n2.state === "archived") {
    return n1.updatedAt >= n2.updatedAt ? -1 : 1;
  } else if (n1.state !== "archived" && n2.state !== "archived") {
    return n1.updatedAt >= n2.updatedAt ? -1 : 1;
  } else {
    return n1.state === "archived" ? 1 : -1;
  }
};
