import { LoginFormData, RegisterFormData } from "../../types/form";
import { axiosInstance } from "./axiosConfig";

export const registerApi = (formData: RegisterFormData) => {
  return axiosInstance.post("/register", formData);
};

export const loginApi = (formData: LoginFormData) => {
  return axiosInstance.post("/login", formData);
};
