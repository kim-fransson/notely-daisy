import DeleteIcon from "@icons/delete-icon.svg?react";
import EditIcon from "@icons/edit-icon.svg?react";
import Checkbox from "@icons/checkbox-icon.svg?react";
import CheckboxChecked from "@icons/checkbox-checked-icon.svg?react";

import { DateTime } from "luxon";
import { mapCategoryToColor } from "@/utils";

export type NoteProps = {
  note: Note;
  onArchiveNote: () => void;
  onDeleteNote: () => void;
  onEditNote: () => void;
};

export const Note = ({
  note,
  onArchiveNote,
  onDeleteNote,
  onEditNote,
}: NoteProps) => {
  const isArchived = note.state === "archived";
  const timestamp = DateTime.fromISO(note.updatedAt).toFormat("dd.MM.yyyy");
  return (
    <div
      className={`card bg-base-200 shadow-lg max-w-sm w-full ${
        isArchived && "opacity-60"
      }`}
    >
      <div className="card-body">
        <div className="flex justify-between items-center gap-2">
          <div
            className={`badge font-medium capitalize ${
              isArchived ? "badge-neutral" : mapCategoryToColor(note.category)
            }`}
          >
            {note.category}
          </div>
          <div className="card-actions justify-end items-center">
            <div
              className="tooltip tooltip-bottom capitalize"
              data-tip={isArchived ? "incomplete" : "complete"}
            >
              <button
                onClick={onArchiveNote}
                className="btn btn-circle btn-ghost"
              >
                {isArchived ? <CheckboxChecked /> : <Checkbox />}
              </button>
            </div>

            <div className="tooltip tooltip-bottom capitalize" data-tip="edit">
              <button onClick={onEditNote} className="btn btn-circle btn-ghost">
                <EditIcon />
              </button>
            </div>

            <div
              className="tooltip tooltip-bottom capitalize"
              data-tip="delete"
            >
              <button
                onClick={onDeleteNote}
                className="btn btn-circle btn-ghost"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
        <h2 className={`card-title ${isArchived && "line-through"}`}>
          {note.title}
        </h2>
        <p className={`${isArchived && "line-through"}`}>{note.description}</p>
        <span className="ml-auto text-sm">{timestamp}</span>
      </div>
    </div>
  );
};
