import React, { FC } from "react";
import VendorProjectTracker from "../components/vendor/VendorProjectTracker";
import { useNavigate, useParams } from "react-router-dom";
const VendorDashboard: FC = () => {
  const navigate = useNavigate();
  const { vendorid } = useParams();
  const handleCreateProject = () => {
    navigate(`/vendor/${vendorid}/create-project`);
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    navigate(`/vendor/login`);
  };
  return (
    <>
      <button onClick={handleCreateProject}>Create New Project</button>
      <button onClick={handleLogOut}>Log Out</button>
      <VendorProjectTracker />
    </>
  );
};

export default VendorDashboard;
