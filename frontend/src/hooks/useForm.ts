import { ChangeEvent, useState } from "react";

export const useForm = <T>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return { formData, handleInputChange, setFormData };
};
