import React, { useContext, useEffect, useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import urlcat from "urlcat";
import format from "/format";
import { IActivities } from "../../Interface";
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
  revampProjects: IProject[];
};

const SERVER = import.meta.env.VITE_SERVER;
const ClientProjectTable = ({ revampProjects }: Props) => {
  const [refreshActivities, setRefreshActivities] = useState<boolean>(false);
  const token: any = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const { clientid, projectid } = useParams();
  const [offEditMode, setOffEditMode] = useState(true);

  const columns: GridColDef[] = [
    {
      field: "projectName",
      headerName: "Project Name",
      width: 310,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "vendorName",
      headerName: "Vendor Name",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "housingType",
      headerName: "Housing Type",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalCosting",
      headerName: "Total Cost",
      width: 150,
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
            bgColor = "#CACACA";
            break;
        }
        return (
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              color: "#444444",
              textAlign: "center",
              borderRadius: 8,
              padding: "0.5rem 1.3rem 0.5rem 1.3rem",
              backgroundColor: bgColor,
              textTransform: "uppercase",
            }}
          >
            {params.row.status}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "View",
      sortable: false,
      width: 150,
      headerAlign: "center",
      align: "center",
      filterable: false,
      renderCell: (params) => {
        const onClick = (e: React.MouseEvent) => {
          console.log(e.target);
          const id = params.row.id;
          navigate(`/client/${clientid}/projects/${id}`);
        };
        return (
          <VisibilityIcon
            onClick={onClick}
            sx={{
              color: "#444444",
              fontSize: "1rem",
              "&:hover": {
                color: "#254D71",
                cursor: "pointer",
              },
            }}
          />
        );
      },
    },
  ];

  const rows = revampProjects.map((project, i) => {
    return {
      id: project._id,
      projectName: project.projectName,
      vendorName: project.vendorName,
      housingType: project.housingType,
      totalCosting: project.totalCosting ? `$${project.totalCosting}` : "$0",
      status: project.projectStatus,
      view: "view",
    };
  });

  // const refreshActivitiesHandler = (): void => {
  //   setRefreshActivities(!refreshActivities);
  // };

  return (
    <Grid container sx={{ mt: "2rem" }}>
      <Grid item md={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          sx={{ height: "30rem" }}
        />
      </Grid>
      {/* <Grid item md={12} sx={{ display: "flex", justifyContent: "right" }}>
          <Button onClick={refreshActivitiesHandler}>
            <RefreshIcon sx={{ marginRight: "10px" }} />
            Refresh Activities
          </Button>
        </Grid> */}
    </Grid>
  );
};

export default ClientProjectTable;
