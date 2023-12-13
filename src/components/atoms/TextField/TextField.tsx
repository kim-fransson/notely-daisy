import { HTMLAttributes } from "react";

export type TextFieldProps = {
  label: string;
} & HTMLAttributes<"input">;

export const TextField = ({ label, placeholder }: TextFieldProps) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
    </label>
  );
};
