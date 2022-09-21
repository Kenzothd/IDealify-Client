import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import VendorLoginForm from "../components/vendor/VendorLoginForm";

const VendorLogIn: FC = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={6} sx={{
          background: 'grey',
          height: '100vh'

        }}>

        </Grid>
        <Grid item xs={6} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '2rem',

        }}

        >
          <Box sx={{ mb: '3rem' }}>
            <Typography variant='h2'>Hello</Typography>
            <Typography variant='h3'>Hello</Typography>
            <Typography variant='h4'>Hello</Typography>
            <Typography variant='h5'>Hello</Typography>
            <Typography variant='body1'>Hello</Typography>
            <Typography variant='body2'>Hello</Typography>
            <Typography variant='h2'>Interior Designers,</Typography>
          </Box>
          <VendorLoginForm />
        </Grid>
      </Grid>


    </Box>
  );
};

export default VendorLogIn;
