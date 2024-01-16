import Layout from "../components/common/Layout";
import Input from "../components/form/Input";
import { useForm } from "../hooks/useForm";
import { LoginFormData } from "../types/form";
import { loginApi } from "../services/api/Auth";

const Login = () => {
  const { formData, handleInputChange } = useForm<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      return await loginApi(formData).then(() => {
        console.log("Successfully Signed in");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <div className="form-wrapper">
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
