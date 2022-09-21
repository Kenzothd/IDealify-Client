import React, { useContext, useEffect, useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import urlcat from "urlcat";
import format from "date-fns/format";
import { IActivities } from "../../Interface";
import VendorSingleProjectView from "./VendorSingleProjectView";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IProject } from "../../Interface";

const buttonSx = {
  backgroundColor: "#5b8368",
  color: "white",
  margin: "3% 1%",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: 1,
  borderRadius: 2,
  padding: "0.5rem 1.5rem",
};

type Props = {
  projects: IProject[];
};

const SERVER = import.meta.env.VITE_SERVER;
const VendorProjectTable = ({ projects }: Props) => {
  // we can also leave it uninitialized but add in <IActivities[] | undefined>
  const [activities, setActivities] = useState<IActivities[]>([]);
  const [refreshActivities, setRefreshActivities] = useState<boolean>(false);
  const token: any = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const { vendorid, projectid } = useParams();
  const [offEditMode, setOffEditMode] = useState(true);

  console.log("table ", projects);

  // useEffect(() => {
  //   const url = urlcat(SERVER, `/activities/projects?projectId=${projectid}`);
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   axios
  //     .get(url, config)
  //     .then((res) => {
  //       setActivities(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [refreshActivities]);

  const columns: GridColDef[] = [
    {
      field: "projectName",
      headerName: "Project Name",
      width: 500,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "clientName",
      headerName: "Client Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        let bgColor: string;
        switch (params.row.status) {
          case "Upcoming":
            bgColor = "#84c4cb";
            break;
          case "Pending":
            bgColor = "gray";
            break;
          case "In Progress":
            bgColor = "orange";
            break;
          case "Completed":
            bgColor = "green";
            break;
          case "Cancelled":
            bgColor = "red";
            break;
          default:
            bgColor = "gray";
            break;
        }
        return (
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.85rem",
              letterSpacing: "0.1rem",
              color: "white",
              width: "100px",
              textAlign: "center",
              borderRadius: 8,
              padding: "3px 10px",
              display: "inline-block",
              backgroundColor: bgColor,
            }}
          >
            {params.row.status}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Click To View",
      sortable: false,
      width: 200,
      headerAlign: "center",
      align: "center",
      filterable: false,
      renderCell: (params) => {
        const onClick = (e: React.MouseEvent) => {
          console.log(e.target);
          const id = params.row.id;
          navigate(`/vendor/${vendorid}/projects/${projectid}/activity/${id}`);
        };
        return (
          <VisibilityIcon
            onClick={onClick}
            sx={{
              "&:hover": {
                color: "#5b8368",
                cursor: "pointer",
              },
            }}
          />
        );
      },
    },
  ];

  const rows = projects.map((project) => {
    return {
      projectName: project.projectName,
      clientName: project.clientId,
      status: project.projectStatus,
      view: "view",
    };
  });

  const refreshActivitiesHandler = (): void => {
    setRefreshActivities(!refreshActivities);
  };

  const handleBackToDashboard = () => {
    navigate(`/vendor/${vendorid}/dashboard`);
  };

  const handleAddActivity = () => {
    navigate(`/vendor/${vendorid}/projects/${projectid}/add-activity`);
  };

  const handleEditProject = () => {
    navigate(`/vendor/${vendorid}/projects/${projectid}/update-project`);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ padding: "0% 5%", marginTop: "2%" }}>
        <Grid item md={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            sx={{ height: "500px", width: "100%" }}
          />
        </Grid>
        <Grid item md={12} sx={{ display: "flex", justifyContent: "right" }}>
          <Button onClick={refreshActivitiesHandler}>
            <RefreshIcon sx={{ marginRight: "10px" }} />
            Refresh Activities
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default VendorProjectTable;
