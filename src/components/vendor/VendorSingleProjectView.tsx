import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  TextField,
  Typography,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";
import urlcat from "urlcat";
import format from "date-fns/format";
import { IProjectTwo } from "../../Interface";

// interface IProject {
//   vendorId: string;
//   clientId: string;
//   projectName: string;
//   housingType: string;
//   projectStartDate: Date;
//   projectEndDate: Date;
//   projectStatus: string;
//   uploadedFiles: string[];
//   description: string;
//   designTheme: string;
//   totalCosting: number;
//   comments: string;
// }

const VendorSingleProjectView: FC = () => {
  const SERVER = import.meta.env.VITE_SERVER;
  const token: any = sessionStorage.getItem("token");
  const { projectid } = useParams();
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
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token);
    axios
      .get(url, config)
      .then((res) => {
        setProjectInfo(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Box>
        <Typography variant="h3">{projectInfo.projectName}</Typography>
        <Card
          sx={{
            padding: "20px",
            backgroundColor: "#5b8368",
            margin: "10px 0px",
          }}
        >
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            <Grid item xs={12} md={3}>
              <Typography sx={{ padding: "5px", color: "white" }}>
                <span style={{ fontWeight: "bold" }}>Housing Type: </span>
                {projectInfo.housingType}
              </Typography>
              <Typography sx={{ padding: "5px", color: "white" }}>
                <span style={{ fontWeight: "bold" }}>Client:</span> Mr Tan Ah Ah
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography sx={{ padding: "5px", color: "white" }}>
                <span style={{ fontWeight: "bold" }}>Start Date:</span>{" "}
                {format(new Date(projectInfo.projectStartDate), "dd LLL yyyy")}
              </Typography>
              <Typography sx={{ padding: "5px", color: "white" }}>
                <span style={{ fontWeight: "bold" }}>End Date:</span>{" "}
                {format(new Date(projectInfo.projectEndDate), "dd LLL yyyy")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                sx={{
                  padding: "5px",
                  textAlign: "center",
                  width: "50%",
                  fontSize: "20px",
                }}
              >
                {projectInfo.projectStatus}
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default VendorSingleProjectView;
