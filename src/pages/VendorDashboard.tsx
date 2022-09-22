import React, { FC } from "react";
import VendorProjectTracker from "../components/vendor/VendorProjectTracker";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

const projectButtonSx = {
  backgroundColor: "#D9DFE4",
  color: "#444444",
  letterSpacing: '0.1rem',
  pl: '0.75rem',
  pr: '0.75rem',
  '&:hover': {
    backgroundColor: '#D9DFE4',
  },
};

const VendorDashboard: FC = () => {
  const navigate = useNavigate();
  const { vendorid } = useParams();
  const handleCreateProject = () => {
    navigate(`/vendor/${vendorid}/create-project`);
  };


  return (
    <Container maxWidth='lg' sx={{
      mb: '5rem',
      pr: '2rem',
      pl: '2rem'

    }}>

      <Grid container sx={{ mb: '1rem' }}>

        <Grid item xs={12} sm={7}>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Typography variant="h3">Projects Overview</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: { sm: "right" },
              gap: '1rem'
            }}
          >

            <Button sx={projectButtonSx} onClick={handleCreateProject}>
              <AddIcon sx={{ paddingRight: "10px" }} />Project</Button>

          </Grid>

        </Grid>

        <VendorProjectTracker />
      </Grid>

    </Container>
  );
};

export default VendorDashboard;
