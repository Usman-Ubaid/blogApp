import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/writeBlog");
  };

  return (
    <Layout>
      <div>
        <h2>Share your knowledge and insights.</h2>
        <button className="btn" onClick={handleNavigation}>
          Write Blog
        </button>
      </div>
    </Layout>
  );
};

export default Dashboard;
