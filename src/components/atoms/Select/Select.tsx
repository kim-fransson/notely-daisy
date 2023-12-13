export type SelectProps = {
  values: string[];
  keys: string[] | number[];
  label: string;
};

export const Select = ({ label, values, keys }: SelectProps) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <select className="select select-bordered capitalize">
        {values.map((val, index) => (
          <option key={keys[index]}>{val}</option>
        ))}
      </select>
    </label>
  );
};
