import { ForwardedRef, forwardRef } from "react";

export type TextFieldProps = {
  label: string;
  placeholder: string;
};

export const TextField = forwardRef(
  (
    { label, placeholder, ...rest }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text capitalize">{label}</span>
        </div>
        <input
          {...rest}
          type="text"
          ref={ref}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
    );
  },
);
