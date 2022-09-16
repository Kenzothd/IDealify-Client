import React, { useEffect, useState, FC } from "react";
import {useNavigate} from "react-router-dom"
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridApi,
} from "@mui/x-data-grid";
import { Button, Menu, Typography } from "@mui/material";
import axios from "axios";
import urlcat from "urlcat";
const SERVER = import.meta.env.VITE_SERVER;
import format from "date-fns/format";
interface IActivities {
  _id: string;
  activityTitle: string;
  activityDescription: string;
  activityStartDate: Date;
  activityEndDate: Date;
  personInCharge: string;
  status: string;
  photos: string[];
  __v?: number;
}

const VendorProjectTable: FC = () => {
  // we can also leave it uninitialized but add in <IActivities[] | undefined>
  const [activities, setActivities] = useState<IActivities[]>([]);
  const [refreshActivities, setRefreshActivities] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    const url = urlcat(SERVER, "/activities");
    axios
      .get(url)
      .then((res) => {
        setActivities(res.data);
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
        switch (params.row.status){
          case "Upcoming":
           bgColor = "purple"; 
           break;
          case "Pending":
            bgColor = "gray";
            break;
          case "In Progress":
            bgColor ="orange";
            break;
          case "Completed":
            bgColor="green";
            break;
          case "Cancelled":
            bgColor= "red";
            break;
          default: 
            bgColor= "gray";
            break;
        }
        return (
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.75rem",
              color: "white",
              borderRadius: 8,
              padding: "3px 10px",
              display: "inline-block",
              backgroundColor: bgColor
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
          navigate(`/activity/${id}`)

        };
        return <Button onClick={onClick} sx={{backgroundColor:"yellow", color:"black",  borderRadius: 8,}}>view</Button>;
      },
    },
  ];

  const rows = activities.map((activity) => {
    return {
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

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
      <Button onClick={refreshActivitiesHandler}>Refresh Activities</Button>
      {/* <pre>{JSON.stringify(activities, null, 2)}</pre> */}
    </div>
  );
};

export default VendorProjectTable;
