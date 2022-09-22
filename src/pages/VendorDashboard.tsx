import React, { FC } from "react";
import VendorProjectTracker from "../components/vendor/VendorProjectTracker";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/material";
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
    <Container maxWidth='lg' sx={{
      mb: '5rem',
      pr: '2rem',
      pl: '2rem'

    }}>
      <button onClick={handleCreateProject}>Create New Project</button>
      <button onClick={handleLogOut}>Log Out</button>
      <VendorProjectTracker />
    </Container>
  );
};

export default VendorDashboard;
