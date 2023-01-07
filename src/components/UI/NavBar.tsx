import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginDialog from "../landing/LoginDialog";
import RegisterDialog from "../landing/RegisterDialog";
import Footer from "../landing/Footer";

const projectButtonSx = {
  backgroundColor: "#D9DFE4",
  color: "#444444",
  letterSpacing: "0.1rem",
  pl: "0.75rem",
  pr: "0.75rem",
  "&:hover": {
    backgroundColor: "#ADB0B1",
  },
};

const NavBar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const navigate = useNavigate();


  const handleLogin = () => {
    setLoginOpen(true)
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };


  const handleRegister = () => {
    setRegisterOpen(true)
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };



  return (
    <>
      <AppBar>
        <Toolbar
          sx={{ backgroundColor: "#254D71", pt: "0.3rem", pb: "0.3rem" }}
        >
          <Container maxWidth="lg" sx={{}}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                IDealify
              </Typography>

              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button sx={projectButtonSx} onClick={handleLogin}>
                  Login
                </Button>
                <LoginDialog
                  loginOpen={loginOpen}
                  handleLoginClose={handleLoginClose}
                />

                <Button sx={projectButtonSx} onClick={handleRegister}>
                  Register
                </Button>
                <RegisterDialog
                  registerOpen={registerOpen}
                  handleRegisterClose={handleRegisterClose}
                />
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Outlet />


      <Footer />
    </>
  );
};

export default NavBar;
