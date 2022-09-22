import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const LoginRedirect: FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{
      background: '#D9DFE4',
      mt: '10rem',
      p: '5rem',
      borderRadius: 4
    }}>

      <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: '600' }}>Opps! Your session has timed out.</Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: '400', mt: '1rem' }}>Please re-login to access your account!</Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '3rem',
        gap: '3rem'
      }}>
        <Button
          type="submit"
          onClick={() => navigate("/client/login")}
          sx={{
            background: "#254D71",
            color: "white",
            letterSpacing: "0.2rem",
            pt: '0.75rem',
            pb: '0.75rem',
            pl: "1.2rem",
            pr: "1.2rem",
            "&:hover": {
              backgroundColor: "#254D71",
            },
          }}
        >
          Client Login
        </Button>


        <Button
          type="submit"
          onClick={() => navigate("/vendor/login")}
          sx={{
            background: "#254D71",
            color: "white",
            letterSpacing: "0.2rem",

            pl: "1rem",
            pr: "1rem",
            "&:hover": {
              backgroundColor: "#254D71",
            },
          }}
        >
          Vendor Login
        </Button>
      </Box>
    </Container >
  );
};

export default LoginRedirect;
