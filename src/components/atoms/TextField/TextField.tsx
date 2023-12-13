import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef(
  (
    { label, error, ...rest }: TextFieldProps,
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
          className={`input input-bordered w-full max-w-xs ${
            error && "border-error"
          }`}
        />
        {error && (
          <div className="label">
            <span className="label-text-alt text-error">{error}</span>
          </div>
        )}
      </label>
    );
  },
);
