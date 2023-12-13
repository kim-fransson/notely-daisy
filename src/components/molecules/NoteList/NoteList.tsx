import { NotesContext } from "@/contexts";
import {
  closeModal,
  filterByCategory,
  filterByState,
  openModal,
  sortNotes,
} from "@/utils";
import Fuse from "fuse.js";
import { useContext, useEffect, useState } from "react";
import { Modal, Note, NoteFormValues } from "@components/molecules";
import { useForm } from "react-hook-form";
import { Select, TextField, Textarea } from "@/components/atoms";
import { categories } from "@/data/categories";

const EDIT_NOTE_MODAL_ID = "edit_note_modal";

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
  const [selectedNote, setSelectedNote] = useState<Note>();
  const { register, handleSubmit } = useForm<NoteFormValues>();

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
    openModal(EDIT_NOTE_MODAL_ID);
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

  const onSubmit = (values: NoteFormValues) => {
    dispatch({
      type: "UPDATE_NOTE",
      note: {
        ...values,
        id: selectedNote!.id,
        updatedAt: new Date().toISOString(),
      },
    });
    closeModal(EDIT_NOTE_MODAL_ID);
  };

  return (
    <>
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
      <Modal
        id={EDIT_NOTE_MODAL_ID}
        title="Edit Note"
        confirmLabel="Edit"
        onConfirm={() => handleSubmit(onSubmit)()}
      >
        <form className="grid grid-cols-2 gap-4">
          <TextField
            placeholder="Add title"
            label="title"
            defaultValue={selectedNote?.title}
            {...register("title", { required: "Please provide a title" })}
          />

          <Select
            defaultValue={selectedNote?.category}
            values={categories}
            keys={categories}
            label="category"
            {...register("category")}
          />

          <Textarea
            label="description"
            defaultValue={selectedNote?.description}
            placeholder="Add description"
            className="col-span-full"
            {...register("description", { maxLength: 200 })}
          />
        </form>
      </Modal>
    </>
  );
};
