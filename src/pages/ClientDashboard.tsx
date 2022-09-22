import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import ClientProjectTracker from "../components/client/ClientProjectTracker";

const projectButtonSx = {
  backgroundColor: "#D9DFE4",
  color: "#444444",
  letterSpacing: "0.1rem",
  pl: "0.75rem",
  pr: "0.75rem",
  "&:hover": {
    backgroundColor: "#D9DFE4",
  },
};

const ClientDashboard: FC = () => {
  const navigate = useNavigate();
  const { clientid } = useParams();
  const handleCreateProject = () => {
    navigate(`/client/${clientid}/create-project`);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mb: "5rem",
        pr: "2rem",
        pl: "2rem",
      }}
    >
      <Grid container sx={{ mb: "1rem" }}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Typography variant="h3">Projects Overview</Typography>
          </Box>
        </Grid>

        <ClientProjectTracker />
      </Grid>
    </Container>
  );
};

export default ClientDashboard;
