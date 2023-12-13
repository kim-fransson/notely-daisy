import SearchIcon from "@icons/search-icon.svg?react";
import AddIcon from "@icons/add-icon.svg?react";

import { Modal } from "@components/molecules";
import { TextField, Select, Textarea } from "@components/atoms";
import { closeModal, openModal } from "@/utils";
import { categories } from "@/data/categories";
import { useContext } from "react";
import { NotesContext } from "@/contexts";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

export type NoteFormValues = {
  title: string;
  category: Category;
  description?: string;
};

const ADD_NOTE_MODAL_ID = "add_note_modal";

export type NavbarProps = {
  onChange: (value: string) => void;
};

export const Navbar = ({ onChange }: NavbarProps) => {
  const { dispatch } = useContext(NotesContext);

  const { register, handleSubmit } = useForm<NoteFormValues>();

  const onSubmit = (values: NoteFormValues) => {
    dispatch({
      type: "ADD_NOTE",
      note: {
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: uuidv4(),
        state: "inbox",
      },
    });
    closeModal(ADD_NOTE_MODAL_ID);
  };

  return (
    <>
      <nav className="navbar bg-base-100 shadow-lg p-4 flex gap-4 sticky">
        <div className="input input-bordered w-full flex gap-4">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <button
          onClick={() => openModal(ADD_NOTE_MODAL_ID)}
          className="btn btn-primary"
        >
          <AddIcon />
          Add
        </button>
      </nav>
      <Modal
        id={ADD_NOTE_MODAL_ID}
        title="Add"
        confirmLabel="Add"
        onConfirm={() => handleSubmit(onSubmit)()}
      >
        <form className="grid grid-cols-2 gap-4">
          <TextField
            placeholder="Add title"
            label="title"
            {...register("title", { required: "Please provide a title" })}
          />

          <Select
            defaultValue={categories[0]}
            values={categories}
            keys={categories}
            label="category"
            {...register("category")}
          />

          <Textarea
            label="description"
            placeholder="Add description"
            className="col-span-full"
            {...register("description", { maxLength: 200 })}
          />
        </form>
      </Modal>
    </>
  );
};
