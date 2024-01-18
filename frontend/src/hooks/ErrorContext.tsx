import { createContext, useContext, useState } from "react";

type ErrorContextType = {
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorContext = createContext<ErrorContextType>({
  errorMsg: "",
  setErrorMsg: () => null,
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <ErrorContext.Provider value={{ errorMsg, setErrorMsg }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};
