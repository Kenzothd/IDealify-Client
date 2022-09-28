import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import VendorLoginForm from "../components/vendor/VendorLoginForm";

const VendorLogIn: FC = () => {
  return (
    <Box >
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: `url(https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "100vh",
            display: { xs: 'none', sm: 'block' },
            mt: '4rem',
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={6}

          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            mt: { xs: '6rem', sm: '0' }
          }}
        >

          <Box sx={{ p: '2rem' }}>
            <Box sx={{ mb: "3rem" }}>
              <Typography variant="h2">Hello</Typography>
              <Typography variant="h2">Interior Designers,</Typography>
            </Box>

            <VendorLoginForm />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: "1.5rem", gap: '0.5rem' }}>
              <Typography variant="body2">Not a member yet?</Typography>

              <Link to="/vendor/sign-up"><Typography variant="body2">SIGN UP</Typography></Link>
            </Box>

          </Box>

        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorLogIn;
