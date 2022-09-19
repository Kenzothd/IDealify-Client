import React, { FC } from "react";
import VendorProjectTracker from "../components/vendor/VendorProjectTracker";
import { useNavigate } from "react-router-dom";
const VendorDashboard: FC = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate(`/vendor/create-project`);
  };
  return (
    <>
      <h1>This is the vendor's dashboard</h1>
      <div>
        <a href="/vendor/account">Account</a>
        <br />
        <a>Favourites</a>
      </div>
      <button onClick={handleCreateProject}>Create New Project</button>
      <VendorProjectTracker />
    </>
  );
};

export default VendorDashboard;
