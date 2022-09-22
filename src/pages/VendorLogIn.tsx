import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import VendorLoginForm from "../components/vendor/VendorLoginForm";

const VendorLogIn: FC = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: `url(https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
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
            <Typography variant="h2">Interior Designers,</Typography>
          </Box>
          <VendorLoginForm />
          <Box>
            <Typography variant="body2" sx={{ mt: "1rem" }}>
              Not a member yet?
              <Link to="/vendor/sign-up">SIGN UP</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorLogIn;
