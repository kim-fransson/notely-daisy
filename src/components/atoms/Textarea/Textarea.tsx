import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export const Textarea = forwardRef(
  (
    { label, className, maxLength, value, required, ...rest }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const stringValue = typeof value === "number" ? value.toString() : value;
    return (
      <label className={twMerge("form-control", className)}>
        <div className="label">
          <span className="label-text capitalize">
            {label}
            {!required && (
              <span className="text-neutral-content/60 ml-2">(optional)</span>
            )}
          </span>
          {maxLength && (
            <span className="label-text-alt">{`${
              stringValue?.length || 0
            } / ${maxLength}`}</span>
          )}
        </div>
        <textarea
          {...rest}
          ref={ref}
          className="textarea textarea-bordered h-36"
        />
      </label>
    );
  },
);
