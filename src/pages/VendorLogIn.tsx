import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import VendorLoginForm from "../components/vendor/VendorLoginForm";

const VendorLogIn: FC = () => {
  const [useTestUser, setUseTestUser] = useState({
    username: "",
    password: "",
  });

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
            height: "full",
            display: { xs: "none", sm: "block" },
            mt: "4rem",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: { xs: "6rem", sm: "0", md: 8 },
          }}
        >
          <Box sx={{ px: "2rem", py: "6rem" }}>
            <Box sx={{ mb: "3rem" }}>
              <Typography variant="h2">Hello</Typography>
              <Typography variant="h2">Interior Designers,</Typography>
            </Box>

            <VendorLoginForm useTestUser={useTestUser} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: "1.5rem",
                gap: "0.5rem",
              }}
            >
              <Typography variant="body2">Not a member yet?</Typography>
              <Link to="/vendor/sign-up">
                <Typography variant="body2">SIGN UP</Typography>
              </Link>
              /
              <Typography
                sx={{
                  textDecoration: "underline",
                  "&:hover": {
                    color: "green",
                    cursor: "pointer",
                  },
                }}
                variant="body2"
                onClick={() => {
                  console.log("clicked");
                  setUseTestUser({
                    username: "testVendorAccount",
                    password: "Password123!",
                  });
                }}
              >
                GENERATE TEST ACCOUNT
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorLogIn;
