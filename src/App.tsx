import "./App.css";
import { Navbar, NoteList } from "@components/molecules";
import { NotesContext } from "@/contexts";
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks";
import { notesReducer } from "@/reducers";
import { useEffect, useReducer, useState } from "react";

export default function App() {
  const [localStorageNotes, saveNotes] = useLocalStorage<Note[]>("notes", []);
  const [notes, dispatch] = useReducer(notesReducer, localStorageNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    saveNotes(notes);
  }, [notes, saveNotes]);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <div className="min-h-screen">
        <Navbar onChange={handleSearch} />
        <NoteList searchTerm={debouncedSearchTerm} />
      </div>
    </NotesContext.Provider>
  );
}
