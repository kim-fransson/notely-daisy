import SearchIcon from "@icons/search-icon.svg?react";
import AddIcon from "@icons/add-icon.svg?react";

export type NavbarProps = {
  onAdd: () => void;
};

export const Navbar = ({ onAdd }: NavbarProps) => {
  return (
    <nav className="navbar bg-base-100 shadow-lg p-4 flex gap-4 sticky">
      <div className="input input-bordered w-full flex gap-4">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent w-full"
        />
      </div>
      <button onClick={onAdd} className="btn btn-primary">
        <AddIcon />
        Add
      </button>
    </nav>
  );
};
