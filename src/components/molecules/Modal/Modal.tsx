import CloseIcon from "@icons/close-icon.svg?react";
import { PropsWithChildren } from "react";

export type ModalProps = {
  id?: string;
  title: string;
  onConfirm: () => void;
  confirmLabel?: string;
} & PropsWithChildren;

export const Modal = ({
  id,
  children,
  title,
  onConfirm,
  confirmLabel = "confirm",
}: ModalProps) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <CloseIcon />
          </button>
        </form>
        <h3 className="font-bold text-lg capitalize">{title}</h3>
        {children}
        <div className="flex justify-end items-center gap-4 mt-8">
          <form method="dialog">
            <button className="btn btn-ghost capitalize">cancel</button>
          </form>
          <button type="submit" onClick={onConfirm} className="btn btn-primary">
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
};