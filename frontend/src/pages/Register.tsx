import Layout from "../components/common/Layout";
import { RegisterFormData } from "../types/form";
import { useForm } from "../hooks/useForm";
import Input from "../components/form/Input";
import axios from "axios";

const Register = () => {
  const { formData, handleInputChange } = useForm<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: "http://localhost:3001/api/register",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(formData),
    });
    if (res) {
      console.log("okay");
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
