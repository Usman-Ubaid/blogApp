import { InputProps } from "../../types/input";

const Input = ({ name, id, onChange, value, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
    />
  );
};

export default Input;
