import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { FC } from "react";
import VendorSignUpForm from "../components/vendor/VendorSignUpForm";
import AWSVendorSignUpForm from "../components/vendor/VendorSignUpForm-aws";

const VendorSignUp: FC = () => {
  return (
    <Container
      maxWidth="md"
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
        {/* <VendorSignUpForm /> */}

        <AWSVendorSignUpForm />
      </Grid>
    </Container>
  );
};

export default VendorSignUp;
