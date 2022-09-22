import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import ClientLoginForm from "../components/client/ClientLoginForm";

const ClientLogIn: FC = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: `url(https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "100vh",
          }}
        ></Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: "2rem",
          }}
        >
          <Box sx={{ mb: "3rem" }}>
            <Typography variant="h2">Hello</Typography>
            <Typography variant="h2">Homeowners,</Typography>
          </Box>
          <ClientLoginForm />
          <Box>
            <Typography variant="body2" sx={{ mt: "1rem" }}>
              Not a member yet?
              <Link to="/client/sign-up">SIGN UP</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientLogIn;
