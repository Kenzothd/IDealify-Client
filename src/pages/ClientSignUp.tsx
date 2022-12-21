import { Container, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import ClientSignUpForm from "../components/client/ClientSignUpForm";

const ClientSignUp: FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: "10rem",
        mb: "5rem",
        pr: "2rem",
        pl: "2rem",
      }}
    >
      <Grid container sx={{ mt: "5rem" }}>
        <Grid item xs={12} sx={{ textAlign: "center", mb: "3rem" }}>
          <Typography variant="h3">Registration</Typography>
        </Grid>
        <ClientSignUpForm />
      </Grid>
    </Container>
  );
};

export default ClientSignUp;
