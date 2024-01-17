import { LoginFormData, RegisterFormData } from "../../types/form";
import { axiosInstance } from "./axiosConfig";

export const registerApi = (formData: RegisterFormData) => {
  return axiosInstance.post("/register", formData);
};

export const loginApi = async (formData: LoginFormData) => {
  return await axiosInstance.post("/login", formData);
};
