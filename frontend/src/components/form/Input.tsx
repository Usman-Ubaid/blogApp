type InputProps = {
  placeholder?: string;
  name: string;
  id: string;
  value: string;
  height?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

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
