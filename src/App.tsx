import "./App.css";
import { Navbar } from "@components/molecules";
import { NotesContext } from "@/contexts";
import { useLocalStorage } from "@uidotdev/usehooks";
import { notesReducer } from "@/reducers";
import { useEffect, useReducer } from "react";

export default function App() {
  const [localStorageNotes, saveNotes] = useLocalStorage<Note[]>("notes", []);
  const [notes, dispatch] = useReducer(notesReducer, localStorageNotes);

  useEffect(() => {
    /* saveNotes(notes) */
  }, [notes, saveNotes]);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <div className="min-h-screen">
        <Navbar />
        {notes.join(",")}
      </div>
    </NotesContext.Provider>
  );
}
