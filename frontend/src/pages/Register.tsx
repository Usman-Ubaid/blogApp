import Layout from "../components/common/Layout";
import { RegisterFormData } from "../types/form";
import { useForm } from "../hooks/useForm";
import Input from "../components/form/Input";
import { registerApi } from "../services/api/Auth";
import axios from "axios";
import { handleRegisterError } from "../utils/handleAuthErrors";
import { useRef } from "react";
import { useError } from "../hooks/ErrorContext";

const Register = () => {
  const { formData, handleInputChange } = useForm<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });
  const errRef = useRef<null | HTMLParagraphElement>(null);
  const { errorMsg, setErrorMsg } = useError();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      return await registerApi(formData).then(() =>
        console.log("Successfully Registered")
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;

        if (errRef.current) {
          errRef.current.style.display = "block";
        }

        if (response?.status) {
          const {
            data: { error: errorMessage },
            status,
          } = response;
          const err = handleRegisterError(status, errorMessage);
          setErrorMsg(err);

          setTimeout(() => {
            setErrorMsg("");
            if (errRef.current) {
              errRef.current.style.display = "none";
            }
          }, 3000);
          console.log(err);
        }
      }
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <div className="form-wrapper">
          <p
            ref={errRef}
            className={errorMsg ? "error-msg" : "offscreen"}
            style={{ color: "red", display: "none", marginTop: "10px" }}
          >
            {errorMsg}
          </p>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <Input
              name="username"
              placeholder="Username"
              id="username"
              onChange={handleInputChange}
              value={formData.username}
            />
            <Input
              name="email"
              placeholder="Email"
              id="email"
              onChange={handleInputChange}
              value={formData.email}
            />
            <Input
              name="password"
              placeholder="Password"
              id="password"
              onChange={handleInputChange}
              value={formData.password}
            />
            <button type="submit" className="btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
