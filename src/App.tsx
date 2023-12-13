import "./App.css";
import { Navbar, Modal } from "@components/molecules";
import { openModal, closeModal } from "./utils";
import { Select, TextField, Textarea } from "@components/atoms";

const categories: Category[] = ["personal", "home", "business"];

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar onAdd={() => openModal("add_note_modal")} />
      <Modal
        id={"add_note_modal"}
        title="Add"
        confirmLabel="Add"
        onConfirm={() => closeModal("add_note_modal")}
      >
        <form className="grid grid-cols-2 gap-4">
          <TextField placeholder="Add title" label="title" />
          <Select values={categories} keys={categories} label="category" />
          <Textarea
            label="description"
            placeholder="Add description"
            className="col-span-full"
          />
        </form>
      </Modal>
    </div>
  );
}
