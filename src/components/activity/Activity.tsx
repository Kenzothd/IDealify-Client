import React, { useState, useEffect, FC } from "react";
import { Card, Grid, Typography } from "@mui/material";
import axios from "axios";
import urlcat from "urlcat";
const SERVER = import.meta.env.VITE_SERVER;
import format from "date-fns/format";
import { useParams } from "react-router-dom";
import { IActivities } from "../../Interface";
const Activity: FC = () => {
  const [activity, setActivity] = useState<IActivities>({
    _id: "",
    activityTitle: "",
    activityDescription: "",
    activityStartDate: new Date(),
    activityEndDate: new Date(),
    personInCharge: "",
    status: "",
    photos: ["url", "url"],
    __v: 0,
  });

  const { id } = useParams();
  useEffect(() => {
    const url = urlcat(SERVER, `/activities/id/${id}`);

    axios
      .get(url)
      .then((res) => setActivity(res.data))
      .catch((err) => console.log(err));
  }, []);

  let bgColor: string;
  switch (activity.status) {
    case "Upcoming":
      bgColor = "purple";
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
    <>
      <Card
        sx={{
          display: "flex",
          padding: "1%",
          backgroundColor: "#d8d8d8",
          borderRadius: 5,
          margin: "2%",
        }}
      >
        <Typography variant="h2">{activity.activityTitle}</Typography>
        <Typography
          variant="h6"
          sx={{
            margin: "0px 2%",
            borderRadius: 10,
            backgroundColor: bgColor,
            padding: "1.5%",
            textAlign: "center",
            width: "10%",
          }}
        >
          {activity.status}
        </Typography>
      </Card>

      <Card
        sx={{
          padding: "1%",
          backgroundColor: "#d8d8d8",
          borderRadius: 5,
          margin: "2%",
        }}
      >
        <Typography variant="h5">
          Person In Charge: {activity.personInCharge}
        </Typography>
        <Typography variant="h5">
          Start Date:{" "}
          {format(new Date(activity.activityStartDate), "dd/MM, hh:mm a")}
        </Typography>
        <Typography variant="h5">
          End Date:{" "}
          {format(new Date(activity.activityEndDate), "dd/MM, hh:mm a")}
        </Typography>
        <Typography variant="h5">
          {" "}
          Description: {activity.activityDescription}
        </Typography>
      </Card>
    </>
  );
};

export default Activity;
