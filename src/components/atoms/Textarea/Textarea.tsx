import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type TextareaProps = {
  label: string;
} & HTMLAttributes<"textarea">;

export const Textarea = ({ label, placeholder, className }: TextareaProps) => {
  return (
    <label className={twMerge("form-control", className)}>
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-36"
        placeholder={placeholder}
      />
    </label>
  );
};
