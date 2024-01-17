import Layout from "../components/common/Layout";
import { RegisterFormData } from "../types/form";
import { useForm } from "../hooks/useForm";
import Input from "../components/form/Input";
import { registerApi } from "../services/api/Auth";
import axios from "axios";
import { handleRegisterError } from "../utils/handleAuthErrors";

const Register = () => {
  const { formData, handleInputChange } = useForm<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      return await registerApi(formData).then(() =>
        console.log("Successfully Registered")
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;

        if (response?.status) {
          const {
            data: { error: errorMessage },
            status,
          } = response;
          const err = handleRegisterError(status, errorMessage);
          console.log(err);
        }
      }
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <div className="form-wrapper">
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
