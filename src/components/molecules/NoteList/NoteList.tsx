import { NotesContext } from "@/contexts";
import { filterByCategory, filterByState, sortNotes } from "@/utils";
import Fuse from "fuse.js";
import { useContext, useEffect, useState } from "react";
import { Note } from "@components/molecules";

export type NoteListProps = {
  searchTerm: string;
  categoryFilter?: Category;
  stateFilter?: NoteState;
};

export const NoteList = ({
  searchTerm,
  categoryFilter,
  stateFilter,
}: NoteListProps) => {
  const { notes, dispatch } = useContext(NotesContext);
  const [activeList, setActiveList] = useState(notes);
  /* const [selectedNote, setSelectedNote] = useState<Note>(); */

  useEffect(() => {
    if (searchTerm) {
      const fuse = new Fuse(notes, {
        keys: ["title"] as Array<NoteKeys>,
        threshold: 0.4,
      });
      setActiveList(fuse.search(searchTerm).map((res) => res.item));
    } else {
      setActiveList(notes);
    }
    setActiveList((curr) =>
      curr
        .filter(
          (note) =>
            filterByCategory(note, categoryFilter) &&
            filterByState(note, stateFilter),
        )
        .sort(sortNotes),
    );
  }, [searchTerm, notes, categoryFilter, stateFilter]);

  const onEditNote = (note: Note) => {
    setSelectedNote(note);
    /* openEditNoteDialog(); */
  };

  const onDeleteNote = (note: Note) => {
    setSelectedNote(note);
    /* openDeleteNoteDialog(); */
  };

  const onArchiveNote = (note: Note) => {
    dispatch({
      type: "TOGGLE_ARCHIVE_NOTE",
      noteId: note.id,
    });
  };

  return (
    <div className="flex flex-wrap gap-6">
      {activeList.map((note) => (
        <Note
          key={note.id}
          note={note}
          onEditNote={() => onEditNote(note)}
          onDeleteNote={() => onDeleteNote(note)}
          onArchiveNote={() => onArchiveNote(note)}
        />
      ))}
    </div>
  );
};
