import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import ClientLoginForm from "../components/client/ClientLoginForm";

const ClientLogIn: FC = () => {
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
            backgroundImage: `url(https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "100vh",
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
          <Box sx={{ p: "2rem" }}>
            <Box sx={{ mb: "3rem" }}>
              <Typography variant="h2">Hello</Typography>
              <Typography variant="h2">Homeowners,</Typography>
            </Box>

            <ClientLoginForm useTestUser={useTestUser} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "1.5rem",
                gap: "0.5rem",
              }}
            >
              <Typography variant="body2">Not a member yet?</Typography>
              <Link to="/client/sign-up">
                <Typography
                  sx={{
                    display: "block",
                    justifyContent: "center",
                  }}
                  variant="body2"
                >
                  SIGN UP
                </Typography>
              </Link>
              /
              <Typography
                sx={{
                  textDecoration: "underline",
                  "&:hover": {
                    color: "green",
                  },
                }}
                variant="body2"
                onClick={() => {
                  console.log("clicked");
                  setUseTestUser({
                    username: "testHomeownerAccount",
                    password: "123",
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

export default ClientLogIn;
