import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Typography, Grid, Box, Container } from "@mui/material";
import axios from "axios";
import urlcat from "urlcat";
import format from "date-fns/format";
import { IProjectTwo } from "../../Interface";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import EditIcon from "@mui/icons-material/Edit";

const buttonSx = {
  backgroundColor: "#74ace4",
  color: "white",
  margin: "1% 1%",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: 1,
  borderRadius: 2,
  padding: "0.5rem 1.5rem",
};

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

const VendorSingleProjectView: FC = () => {
  const SERVER = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const token: any = sessionStorage.getItem("token");
  const { vendorid, projectid } = useParams();
  const [clientName, setClientName] = useState("");

  let dollarUSLocale = Intl.NumberFormat("en-US");
  const [projectInfo, setProjectInfo] = useState<IProjectTwo>({
    vendorId: "",
    clientId: "",
    projectName: "",
    housingType: "",
    projectStartDate: new Date(),
    projectEndDate: new Date(),
    projectStatus: "",
    uploadedFiles: ["url", "url", "url"],
    description: "",
    designTheme: "",
    totalCosting: 0,
    comments: "",
  });

  useEffect(() => {
    const url = urlcat(SERVER, `/projects/id/${projectid}`);
    console.log(url);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, config)
      .then((res) => {
        setProjectInfo(res.data[0]);
        const clientNameUrl = urlcat(
          SERVER,
          `/clients/id/${res.data[0].clientId}`
        );
        axios
          .get(clientNameUrl, config)
          .then((res) => {
            console.log(res.data.fullName);
            setClientName(res.data.fullName);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddActivity = () => {
    navigate(`/vendor/${vendorid}/projects/${projectid}/add-activity`);
  };

  const handleViewProject = () => {
    navigate(`/vendor/${vendorid}/projects/${projectid}/update-project`);
  };

  const handleReturnToAllProjects = () => {
    navigate(`/vendor/${vendorid}/dashboard`);
  };

  let bgColor: string;
  switch (projectInfo.projectStatus) {
    case "Upcoming":
      bgColor = "#6AA6D1";
      break;
    case "In Progress":
      bgColor = "#FDC22B";
      break;
    case "Completed":
      bgColor = "#6FA585";
      break;
    case "Cancelled":
      bgColor = "#E96755";
      break;
    default:
      bgColor = "CACACA";
      break;
  }

  return (
    <>
      <Grid sx={{ display: "flex", justifyContent: "right" }}>
        <Box
          sx={{
            display: "inline-block",
            mb: "1.5rem",
            cursor: "pointer",
            border: 1,
            p: "0.3rem",
            borderRadius: "1rem",
          }}
        >
          <Typography
            variant="body1"
            sx={{ alignItems: "center", right: "1px" }}
            onClick={handleReturnToAllProjects}
          >
            <KeyboardReturnIcon sx={{ pr: "0.3rem", fontSize: "0.8rem" }} />
            All Projects
          </Typography>
        </Box>
      </Grid>

      <Grid container sx={{ mb: "1rem" }}>
        <Grid item xs={12} sm={7}>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Typography variant="h3">{projectInfo.projectName}</Typography>

            <Button sx={projectButtonSx} onClick={handleViewProject}>
              <EditIcon sx={{ paddingRight: "10px", fontSize: "1rem" }} />
              Edit
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: { sm: "right" },
              gap: "1rem",
            }}
          >
            <Button sx={projectButtonSx} onClick={handleAddActivity}>
              <AddIcon sx={{ paddingRight: "10px", fontSize: "1rem" }} />
              Activity
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Card
        sx={{
          padding: "20px",
          backgroundColor: "#5b8368",
          margin: "10px 0px",
        }}
      >
        <Grid container spacing={2} sx={{ textAlign: "center" }}>
          <Grid item xs={12} md={3} sx={{ textAlign: "left" }}>
            <Typography sx={{ padding: "5px", color: "white" }}>
              <span style={{ fontWeight: "bold" }}>Housing Type: </span>
              {projectInfo.housingType}
            </Typography>
            <Typography sx={{ padding: "5px", color: "white" }}>
              <span style={{ fontWeight: "bold" }}>Client:</span> {clientName}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ textAlign: "left" }}>
            <Typography sx={{ padding: "5px", color: "white" }}>
              <span style={{ fontWeight: "bold" }}>Start Date:</span>{" "}
              {format(new Date(projectInfo.projectStartDate), "dd LLL yyyy")}
            </Typography>
            <Typography sx={{ padding: "5px", color: "white" }}>
              <span style={{ fontWeight: "bold" }}>End Date:</span>{" "}
              {format(new Date(projectInfo.projectEndDate), "dd LLL yyyy")}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ textAlign: "left" }}>
            <Typography sx={{ padding: "5px", color: "white" }}>
              <span style={{ fontWeight: "bold" }}>Design Theme:</span>{" "}
              {projectInfo.designTheme}
            </Typography>
            <Typography sx={{ padding: "5px", color: "white" }}>
              <span style={{ fontWeight: "bold" }}>Total Costing:</span> $
              {dollarUSLocale.format(projectInfo.totalCosting)}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            sx={{
              textAlign: "right",
            }}
          >
            <Grid item>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "600",
                  color: "#444444",
                  textAlign: "center",
                  borderRadius: 8,
                  padding: "0.5rem 1rem 0.5rem 1rem",
                  display: "inline-block",
                  backgroundColor: bgColor,
                  textTransform: "uppercase",
                }}
              >
                {projectInfo.projectStatus}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default VendorSingleProjectView;
