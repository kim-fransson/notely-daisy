import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TextareaProps = {
  label: string;
  placeholder: string;
  className?: string;
  defaultValue?: string;
};

export const Textarea = forwardRef(
  (
    { label, placeholder, className, defaultValue, ...rest }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <label className={twMerge("form-control", className)}>
        <div className="label">
          <span className="label-text capitalize">{label}</span>
        </div>
        <textarea
          {...rest}
          defaultValue={defaultValue}
          ref={ref}
          className="textarea textarea-bordered h-36"
          placeholder={placeholder}
        />
      </label>
    );
  },
);
