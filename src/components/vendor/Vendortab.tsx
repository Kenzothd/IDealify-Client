import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import {
  AccountCircle,
  LibraryAddOutlined,
  MoveToInbox,
  SettingsOutlined,
  TableRowsOutlined,
} from "@mui/icons-material";

const VendorTab = () => {
  const [value, setValue] = useState("projects");
  const navigate = useNavigate();

  const handleChange = (e: React.SyntheticEvent, value: string) => {
    setValue(value);
    navigate(`/vendor/${value}`);

    // switch (value) {
    //   case "account":
    //     navigate("/vendor/account");
    //     break;
    //   case "profile":
    //     // code block
    //     break;
    //   case "inbox":
    //     // code block
    //     break;
    //   case "new-project":
    //     // code block
    //     break;
    //   default:
    //   // code block
    // }
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          icon={<SettingsOutlined />}
          iconPosition="start"
          value="account"
          label="Account"
        />
        <Tab
          disabled
          icon={<AccountCircle />}
          iconPosition="start"
          value="profile"
          label="Profile"
        />
        <Tab
          disabled
          icon={<MoveToInbox />}
          iconPosition="start"
          value="inbox"
          label="Inbox"
        />
        <Tab
          icon={<TableRowsOutlined />}
          iconPosition="start"
          value="projects"
          label="Project Tracker"
        />
        <Tab
          icon={<LibraryAddOutlined />}
          iconPosition="start"
          value="create-project"
          label="New Project"
        />
      </Tabs>
      <Outlet />
    </>
  );
};

export default VendorTab;
