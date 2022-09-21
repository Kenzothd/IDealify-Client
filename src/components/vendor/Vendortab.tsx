import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
          value="dashboard"
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
