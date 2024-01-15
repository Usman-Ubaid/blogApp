import Layout from "../components/common/Layout";
import Form from "../components/form/Form";

const Login = () => {
  const loginFields = [
    { name: "email", placeholder: "Email" },
    { name: "password", placeholder: "Password" },
  ];
  return (
    <Layout>
      <div className="form-container">
        <div className="form-wrapper">
          <h2>Login</h2>
          <Form fields={loginFields} buttonText="Login" />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
