import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  LibraryAddOutlined,
  MoveToInbox,
  SettingsOutlined,
  TableRowsOutlined,
} from "@mui/icons-material";
import { borderBottom, borderBottomColor } from "@mui/system";

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

const ClientTab = () => {
  const [value, setValue] = useState("dashboard");
  const navigate = useNavigate();
  const { clientid } = useParams();

  const handleChange = (e: React.SyntheticEvent, value: string) => {
    setValue(value);
    navigate(`/client/${clientid}/${value}`);

    // switch (value) {
    //   case "account":
    //     navigate(`/vendor/${vendorid}/${value}`);
    //     break;
    //   case "profile":
    //     // disabled(KIV)
    //     break;
    //   case "inbox":
    //     // disabled(KIV)
    //     break;
    //   case "dashboard":
    //     // code block
    //     navigate(`/vendor/${vendorid}/${value}`);
    //     break;
    //   case "create-project":
    //     // code block
    //     navigate(`/vendor/${vendorid}/${value}`);
    //     break;
    //   default:
    //     navigate(`/vendor/${vendorid}/dashboard`);
    // }
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    navigate(`/client/login`);
  };

  return (
    <Box>
      <Container>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "5rem",
            mb: "3rem",
            borderBottom: 1,
            borderBottomColor: "#444444",
          }}
        >
          <Grid item xs={8}>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                icon={<SettingsOutlined />}
                iconPosition="start"
                value="account"
                label="Account"
                sx={{
                  color: "black",
                  "&:hover": {
                    color: "#254D71",
                  },
                }}
              />

              <Tab
                icon={<TableRowsOutlined />}
                iconPosition="start"
                value="dashboard"
                label="Projects"
                sx={{ color: "black" }}
              />
              {/* <Tab
                icon={<LibraryAddOutlined />}
                iconPosition="start"
                value="create-project"
                label="New Project"
                sx={{ color: 'black' }}
              /> */}
              {/* <Tab
                disabled
                icon={<AccountCircle />}
                iconPosition="start"
                value="profile"
                label="Profile"
                sx={{ color: "black" }}
              /> */}
              <Tab
                disabled
                icon={<MoveToInbox />}
                iconPosition="start"
                value="inbox"
                label="Inbox"
                sx={{ color: "black" }}
              />
            </Tabs>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Button sx={projectButtonSx} onClick={handleLogOut}>
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Outlet />
    </Box>
  );
};

export default ClientTab;
