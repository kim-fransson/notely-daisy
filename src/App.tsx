import "./App.css";
import { Navbar, NoteList } from "@components/molecules";
import { NotesContext } from "@/contexts";
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks";
import { notesReducer } from "@/reducers";
import { useEffect, useReducer, useState } from "react";
import { categories } from "./data/categories";

export default function App() {
  const [localStorageNotes, saveNotes] = useLocalStorage<Note[]>("notes", []);
  const [notes, dispatch] = useReducer(notesReducer, localStorageNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );
  const [showArchived, setShowArchived] = useState(false);

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
        <main className="p-10">
          <h1 className="mb-4 text-2xl">Your notes</h1>

          <div className="flex justify-between">
            <div role="tablist" className="tabs tabs-bordered max-w-lg mb-4">
              <a
                onClick={() => setSelectedCategory("all")}
                role="tab"
                className={`tab capitalize ${
                  selectedCategory === "all" && "tab-active"
                }`}
              >
                all
              </a>
              {categories.map((category) => (
                <a
                  onClick={() => setSelectedCategory(category)}
                  key={category}
                  role="tab"
                  className={`tab capitalize ${
                    selectedCategory === category && "tab-active"
                  }`}
                >
                  {category}
                </a>
              ))}
            </div>

            <label className="label flex gap-4 cursor-pointer">
              <input
                onChange={(e) => setShowArchived(e.target.checked)}
                type="checkbox"
                checked={showArchived}
                className="checkbox"
              />
              <span className="label-text">Show completed notes</span>
            </label>
          </div>

          <NoteList
            searchTerm={debouncedSearchTerm}
            categoryFilter={
              selectedCategory !== "all" ? selectedCategory : undefined
            }
            stateFilter={showArchived ? "archived" : undefined}
          />
        </main>
      </div>
    </NotesContext.Provider>
  );
}
