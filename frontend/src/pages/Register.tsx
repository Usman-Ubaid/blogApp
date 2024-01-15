import Layout from "../components/common/Layout";
import Form from "../components/form/Form";

const Register = () => {
  const registerFields = [
    { name: "username", placeholder: "Username" },
    { name: "email", placeholder: "Email" },
    { name: "password", placeholder: "Password" },
  ];

  return (
    <Layout>
      <div className="form-container">
        <div className="form-wrapper">
          <h2>Register</h2>
          <Form fields={registerFields} buttonText="Register" />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
