import { NotesContext } from "@/contexts";
import {
  closeModal,
  filterByCategory,
  filterByState,
  mapCategoryToColor,
  openModal,
  sortNotes,
} from "@/utils";
import Fuse from "fuse.js";
import { useContext, useEffect, useState } from "react";
import { Modal, Note, NoteFormValues } from "@components/molecules";
import { useForm } from "react-hook-form";
import { Select, TextField, Textarea } from "@/components/atoms";
import { categories } from "@/data/categories";
import NoNotesIcon from "@icons/no-notes-illustration.svg?react";
import NoResultsIcon from "@icons/no-search-results-illustration.svg?react";

const EDIT_NOTE_MODAL_ID = "edit_note_modal";
const DELETE_NOTE_MODAL_ID = "delete_note_modal";

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
    openModal(DELETE_NOTE_MODAL_ID);
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

  const handleDelete = () => {
    dispatch({
      type: "DELETE_NOTE",
      noteId: selectedNote!.id,
    });
    closeModal(DELETE_NOTE_MODAL_ID);
  };

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {activeList.length !== 0 ? (
          activeList.map((note) => (
            <Note
              key={note.id}
              note={note}
              onEditNote={() => onEditNote(note)}
              onDeleteNote={() => onDeleteNote(note)}
              onArchiveNote={() => onArchiveNote(note)}
            />
          ))
        ) : (
          <MessageDisplay
            notes={activeList}
            showArchived={stateFilter === "archived"}
            category={categoryFilter}
            searchTerm={searchTerm}
          />
        )}
      </div>
      <Modal
        id={EDIT_NOTE_MODAL_ID}
        title="Edit note"
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
      <Modal
        id={DELETE_NOTE_MODAL_ID}
        title="Delete note"
        confirmLabel="Delete"
        confirmType="danger"
        onConfirm={handleDelete}
      >
        <p>Are you sure you want to delete this note?</p>
      </Modal>
    </>
  );
};

const MessageDisplay = (props: {
  notes: Note[];
  showArchived: boolean;
  category?: Category;
  searchTerm?: string;
}) => {
  const { notes, showArchived, category, searchTerm } = props;
  if (notes.length > 0) {
    return null;
  }

  let icon: JSX.Element = <NoNotesIcon />;
  let text: string | JSX.Element = "";

  if (notes.length > 0 && !category) {
    return null;
  }

  if (notes.length === 0 && !searchTerm) {
    icon = <NoNotesIcon />;
    text = "Oops! No notes here. Time to start your note-taking adventure!";
  }

  if (notes.length === 0 && searchTerm) {
    icon = <NoResultsIcon />;
    text = "Sorry, no notes found. Time to create some magic!";
  }

  if (notes.length === 0 && category && !searchTerm) {
    icon = <NoNotesIcon />;
    text = (
      <span>
        Sorry, no{" "}
        <div
          className={`badge font-medium capitalize ${mapCategoryToColor(
            category,
          )}`}
        >
          {category}
        </div>{" "}
        notes found. Time to create some magic!
      </span>
    );
  }

  if (notes.length === 0 && showArchived && !searchTerm) {
    icon = <NoNotesIcon />;
    text = "Oops! No completed notes yet. Keep going, the finish line is near!";
  }

  return (
    <div className="mx-auto flex flex-col gap-4 items-center mt-20">
      {icon}
      <span className="text-lg text-center">{text}</span>
    </div>
  );
};
