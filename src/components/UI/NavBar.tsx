import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const projectButtonSx = {
  backgroundColor: "#D9DFE4",
  color: "#444444",
  letterSpacing: "0.1rem",
  pl: "0.75rem",
  pr: "0.75rem",
  "&:hover": {
    backgroundColor: "#D9DFE4",
  },
};

const NavBar = () => {
  const navigate = useNavigate();
  const vendorLogin = () => {
    navigate("/vendor/login");
  };
  const clientLogin = () => {
    navigate("/client/login");
  };
  return (
    <>
      <AppBar>
        <Toolbar sx={{ backgroundColor: "#254D71", pt: '0.3rem', pb: '0.3rem' }}>
          <Container
            maxWidth="lg"
            sx={{
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", cursor: 'pointer' }}
                onClick={() => {
                  navigate("/");
                }}

              >
                IDealify
              </Typography>

              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button sx={projectButtonSx} onClick={clientLogin}>
                  Homeowners
                </Button>
                <Button sx={projectButtonSx} onClick={vendorLogin}>
                  Interior Designers
                </Button>
              </Box>

            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default NavBar;
