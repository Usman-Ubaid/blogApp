import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import Input from "../components/form/Input";
import { useForm } from "../hooks/useForm";
import { LoginFormData } from "../types/form";
import { loginApi } from "../services/api/Auth";
import { handleLoginError } from "../utils/handleAxiosErrors";
import { useMessage } from "../hooks/MessageContext";
import { saveAuthToken } from "../utils/tokenStorage";

const Login = () => {
  const { formData, handleInputChange } = useForm<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { errorMsg, setErrorMsg, successMsg, setSuccessMsg } = useMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      return await loginApi(formData).then((res) => {
        const token = res.data?.data?.token;
        saveAuthToken(token);
        setSuccessMsg("Successfully logged in");
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
        navigate("/");
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = handleLoginError(error.response?.status);
        setErrorMsg(err);

        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <div className="form-wrapper">
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}

          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
