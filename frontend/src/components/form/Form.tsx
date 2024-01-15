import Input from "./Input";

type Field = {
  name: string;
  type?: string;
  placeholder: string;
};

type InputProps = {
  fields: Field[];
  buttonText: string;
};

const Form = ({ fields, buttonText }: InputProps) => {
  return (
    <form>
      <Input fields={fields} />
      <button type="submit" className="btn">
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
