import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import {
  AccountCircle,
  LibraryAddOutlined,
  MoveToInbox,
  SettingsOutlined,
  TableRowsOutlined,
} from "@mui/icons-material";

const VendorTab = () => {
  const [value, setValue] = useState("dashboard");
  const navigate = useNavigate();
  const { vendorid } = useParams();

  const handleChange = (e: React.SyntheticEvent, value: string) => {
    setValue(value);
    navigate(`/vendor/${vendorid}/${value}`);

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
  return (
    <Box>
      <Tabs value={value} onChange={handleChange} sx={{ mt: '3rem', mb: '5rem' }} centered>
        <Tab
          icon={<SettingsOutlined />}
          iconPosition="start"
          value="account"
          label="Account"
          sx={{
            color: 'black',
            borderBottom: 1,
            '&:hover': {
              color: '#254D71',
            },
          }}

        />
        <Tab
          disabled
          icon={<AccountCircle />}
          iconPosition="start"
          value="profile"
          label="Profile"
          sx={{ color: 'black', borderBottom: 1, }}
        />
        <Tab
          disabled
          icon={<MoveToInbox />}
          iconPosition="start"
          value="inbox"
          label="Inbox"
          sx={{ color: 'black', borderBottom: 1, }}
        />
        <Tab
          icon={<TableRowsOutlined />}
          iconPosition="start"
          value="dashboard"
          label="Dashboard"
          sx={{ color: 'black', borderBottom: 1, }}
        />
        <Tab
          icon={<LibraryAddOutlined />}
          iconPosition="start"
          value="create-project"
          label="New Project"
          sx={{ color: 'black', borderBottom: 1, }}
        />

      </Tabs>
      <Outlet />
    </Box>
  );
};

export default VendorTab;
