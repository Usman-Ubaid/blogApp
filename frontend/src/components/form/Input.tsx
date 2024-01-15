type Field = {
  name: string;
  type?: string;
  placeholder?: string;
};

type InputProps = {
  fields: Field[];
};

const Input = ({ fields }: InputProps) => {
  return (
    <>
      {fields &&
        fields.map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
          />
        ))}
    </>
  );
};

export default Input;
