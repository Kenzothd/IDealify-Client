import React, { useContext, useEffect, useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import urlcat from "urlcat";
import format from "date-fns/format";
import { IActivities } from "../../Interface";
import VendorSingleProjectView from "./VendorSingleProjectView";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";

const SERVER = import.meta.env.VITE_SERVER;
const VendorActivityTable: FC = () => {
  // we can also leave it uninitialized but add in <IActivities[] | undefined>
  const [activities, setActivities] = useState<IActivities[]>([]);
  const [refreshActivities, setRefreshActivities] = useState<boolean>(false);
  const token: any = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const { vendorid, projectid } = useParams();
  const [offEditMode, setOffEditMode] = useState(true);

  useEffect(() => {
    const url = urlcat(SERVER, `/activities/projects?projectId=${projectid}`);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, config)
      .then((res) => {
        setActivities(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [refreshActivities]);

  const columns: GridColDef[] = [
    {
      field: "activityTitle",
      headerName: "Activity Title",
      width: 310,
      headerAlign: "left",
      align: "left",

    },
    {
      field: "activityStartDate",
      headerName: "Start Date",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "activityEndDate",
      headerName: "End Date",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "personInCharge",
      headerName: "Person In Charge",
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
            bgColor = "#6AA6D1";
            break;
          case "Pending":
            bgColor = "#CACACA";
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
          <Typography variant='body2'
            sx={{
              fontWeight: "500",
              color: "#444444",
              textAlign: "center",
              borderRadius: 8,
              padding: "0.5rem 1.3rem 0.5rem 1.3rem",
              backgroundColor: bgColor,
              textTransform: 'uppercase'
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
          navigate(`/vendor/${vendorid}/projects/${projectid}/activity/${id}`);
        };
        return (
          <VisibilityIcon
            onClick={onClick}
            sx={{
              color: '#444444',
              fontSize: '1rem',
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

  const rows = activities.map((activity) => {
    return {
      projectId: activity.projectId,
      id: activity._id,
      activityTitle: activity.activityTitle,
      status: activity.status,
      activityStartDate: format(
        new Date(activity.activityStartDate),
        "dd LLL yyyy"
      ),
      activityEndDate: format(
        new Date(activity.activityEndDate),
        "dd LLL yyyy"
      ),
      personInCharge: activity.personInCharge,
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
    <Container maxWidth='lg' sx={{
      mb: '5rem',
      pr: '2rem',
      pl: '2rem'

    }}>
      <Grid container >
        <Grid item md={12} sx={{ mb: '2rem' }}>
          <VendorSingleProjectView />
        </Grid>

        <Grid item md={12} sx={{ display: "flex", justifyContent: "right" }}>
          <Button onClick={refreshActivitiesHandler}>
            <RefreshIcon sx={{ marginRight: "10px", fontSize: '1rem' }} />
            Refresh
          </Button>
        </Grid>

        <Grid item md={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            sx={{ height: "30rem" }}
          />
        </Grid>

      </Grid>
    </Container>
  );
};

export default VendorActivityTable;
