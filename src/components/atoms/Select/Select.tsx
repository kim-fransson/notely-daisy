import { ForwardedRef, forwardRef } from "react";

export type SelectProps = {
  values: string[];
  keys: string[] | number[];
  label: string;
  defaultValue?: string;
};

export const Select = forwardRef(
  (
    { label, values, keys, defaultValue, ...rest }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text capitalize">{label}</span>
        </div>
        <select
          {...rest}
          defaultValue={defaultValue}
          ref={ref}
          className="select select-bordered capitalize"
        >
          {values.map((val, index) => (
            <option key={keys[index]}>{val}</option>
          ))}
        </select>
      </label>
    );
  },
);
