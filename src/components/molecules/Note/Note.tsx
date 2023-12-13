import DeleteIcon from "@icons/delete-icon.svg?react";
import EditIcon from "@icons/edit-icon.svg?react";
import Checkbox from "@icons/checkbox-icon.svg?react";
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
  const timestamp = DateTime.fromISO(note.updatedAt).toFormat("dd.MM.yyyy");
  return (
    <div className="card bg-base-200 shadow-lg max-w-sm">
      <div className="card-body">
        <div className="flex justify-between items-center gap-2">
          <div
            className={`badge font-medium capitalize ${mapCategoryToColor(
              note.category,
            )}`}
          >
            {note.category}
          </div>
          <div className="card-actions justify-end items-center">
            <div
              className="tooltip tooltip-bottom capitalize"
              data-tip="complete"
            >
              <button
                onClick={onArchiveNote}
                className="btn btn-circle btn-ghost"
              >
                <Checkbox />
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
        <h2 className="card-title">{note.title}</h2>
        <p>{note.description}</p>
        <span className="ml-auto text-sm">{timestamp}</span>
      </div>
    </div>
  );
};
