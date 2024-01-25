import { useEffect } from "react";

type UseMessageHandlingProps = {
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
};

const useMessageHandling = ({
  setErrorMsg,
  setSuccessMsg,
}: UseMessageHandlingProps) => {
  useEffect(() => {
    // Reset messages when the component unmounts or when errorMsg/successMsg change
    return () => {
      setErrorMsg("");
      setSuccessMsg("");
    };
  }, [setErrorMsg, setSuccessMsg]);
};

export default useMessageHandling;
