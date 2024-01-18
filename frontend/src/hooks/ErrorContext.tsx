import { createContext, useContext, useState } from "react";

type ErrorContextType = {
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  successMsg: string;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorContext = createContext<ErrorContextType>({
  errorMsg: "",
  setErrorMsg: () => null,
  successMsg: "",
  setSuccessMsg: () => null,
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  return (
    <ErrorContext.Provider
      value={{ errorMsg, setErrorMsg, successMsg, setSuccessMsg }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};
