import { createContext, useContext, useState } from "react";
import { LoginFormData } from "../types/form";
import { loginApi } from "../services/api/Auth";
import { saveAuthToken } from "../utils/tokenStorage";

type AuthContextType = {
  currentUser: { id: number | null; username: string };
  loginUser: (formData: LoginFormData) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: { id: null, username: "" },
  loginUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(
    user ? JSON.parse(user) : null
  );

  const loginUser = async (formData: LoginFormData) => {
    const res = await loginApi(formData);
    const token = res.data?.data?.token;
    const { id, username } = res.data.data;
    setCurrentUser({ id, username });
    localStorage.setItem("user", JSON.stringify({ id, username }));
    saveAuthToken(token);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // if (!context) return null;
  return context;
};
