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
      <h1>This is the vendor's dashboard</h1>
      <div>
        <a href={`/vendor/${vendorid}/account`}>Account</a>
        <br />
        <a>Favourites</a>
      </div>
      <button onClick={handleCreateProject}>Create New Project</button>
      <button onClick={handleLogOut}>Log Out</button>
      <VendorProjectTracker />
    </>
  );
};

export default VendorDashboard;
