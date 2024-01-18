import { createContext, useContext, useState } from "react";

type MessageContextType = {
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  successMsg: string;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
};

export const MessageContext = createContext<MessageContextType>({
  errorMsg: "",
  setErrorMsg: () => null,
  successMsg: "",
  setSuccessMsg: () => null,
});

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  return (
    <MessageContext.Provider
      value={{ errorMsg, setErrorMsg, successMsg, setSuccessMsg }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  return useContext(MessageContext);
};
