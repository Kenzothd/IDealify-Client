import React, { useContext, useEffect, useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import urlcat from "urlcat";
import format from "date-fns/format";
import { IActivities } from "../../Interface";
import VendorSingleProjectView from "./VendorSingleProjectView";

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

const SERVER = import.meta.env.VITE_SERVER;
const VendorProjectTable: FC = () => {
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
      width: 450,
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
      field: "activityStartDate",
      headerName: "Start Date",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "activityEndDate",
      headerName: "End Date",
      width: 200,
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
          <Button
            onClick={onClick}
            sx={{
              backgroundColor: "#d1d1b5",
              color: "white",
              borderRadius: 8,
              width: "150px",
              padding: "1px",
            }}
          >
            view
          </Button>
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
        "dd/MM, hh:mm a"
      ),
      activityEndDate: format(
        new Date(activity.activityEndDate),
        "dd/MM, hh:mm a"
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
    <>
      <VendorSingleProjectView />

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        sx={{ height: "500px", width: "100%" }}
      />
      <Button sx={buttonSx} onClick={refreshActivitiesHandler}>
        Refresh Activities
      </Button>
      {/* <pre>{JSON.stringify(activities, null, 2)}</pre> */}
      <Button sx={buttonSx} onClick={handleBackToDashboard}>
        Back to Dashboard
      </Button>
      <Button sx={buttonSx} onClick={handleAddActivity}>
        Add activity
      </Button>
      <Button sx={buttonSx} onClick={handleEditProject}>
        Edit Project
      </Button>
    </>
  );
};

export default VendorProjectTable;
