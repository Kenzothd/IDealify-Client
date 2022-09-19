import React, { useContext, useState, useEffect, FC } from "react";
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
const SERVER = import.meta.env.VITE_SERVER;
import format from "date-fns/format";
import sub from "date-fns/sub";
import { useNavigate, useParams } from "react-router-dom";
import { IActivities } from "../../Interface";

const buttonSx = {
  backgroundColor: "blue",
  color: "white",
  margin: "3% auto",
  display: "flex",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: 1,
  borderRadius: 2,
  padding: "0.5rem 1.5rem",
};

const Activity: FC = () => {
  const { vendorid, projectid, activityid } = useParams();
  const url = urlcat(SERVER, `/activities/id/${activityid}`);
  const token: any = sessionStorage.getItem("token");
  const [offEditMode, setOffEditMode] = useState(true);
  const navigate = useNavigate();

  const [activity, setActivity] = useState<IActivities>({
    projectId: "",
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

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token);
    axios
      .get(url, config)
      .then((res) => setActivity(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: activity._id,
      activityTitle: activity.activityTitle,
      activityDescription: activity.activityDescription,
      activityStartDate: format(
        new Date(activity.activityStartDate),
        "yyyy-MM-dd"
      ),
      activityEndDate: format(new Date(activity.activityEndDate), "yyyy-MM-dd"),
      personInCharge: activity.personInCharge,
      status: activity.status,
      photos: activity.photos,
    },
    validationSchema: Yup.object().shape({
      personInCharge: Yup.string().required("Required"),
      activityStartDate: Yup.date().required("Required"),
      activityEndDate: Yup.date()
        .min(
          sub(new Date(activity.activityStartDate), { days: 1 }),
          `End Date should not be before Start Date`
        )
        .required("Required"),
      activityDescription: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      if (offEditMode) {
        setOffEditMode(!offEditMode);
      } else {
        alert("data has been sent for update");
        setOffEditMode(!offEditMode);
        console.log(values);
        axios
          .put(url, values)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    },
  });

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

  const handleReturnToAllActivities = () => {
    navigate(`/vendor/${vendorid}/projects/${projectid}`);
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          padding: "1%",
          backgroundColor: "#F5F5F5",
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
          backgroundColor: "#F5F5F5",
          borderRadius: 5,
          margin: "2%",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            required
            disabled={offEditMode}
            autoComplete="off"
            id="personInCharge"
            name="personInCharge"
            label="Person In-Charge"
            variant="filled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.personInCharge}
            sx={{ backgroundColor: "white", width: "100%" }}
          />
          {formik.touched.personInCharge && formik.errors.personInCharge ? (
            <div>{formik.errors.personInCharge}</div>
          ) : null}
          <TextField
            required
            disabled={offEditMode}
            autoComplete="off"
            variant="filled"
            label="Start Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            id="activityStartDate"
            name="activityStartDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.activityStartDate}
            sx={{ width: "100%" }}
          />
          {formik.touched.activityStartDate &&
          formik.errors.activityStartDate ? (
            <div>{formik.errors.activityStartDate}</div>
          ) : null}

          <TextField
            required
            disabled={offEditMode}
            autoComplete="off"
            variant="filled"
            label="End Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            id="activityEndDate"
            name="activityEndDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.activityEndDate}
            sx={{ width: "100%" }}
          />
          {formik.touched.activityEndDate && formik.errors.activityEndDate ? (
            <div>{formik.errors.activityEndDate}</div>
          ) : null}
          <TextField
            required
            disabled={offEditMode}
            autoComplete="off"
            id="activityDescription"
            name="activityDescription"
            label="Description "
            variant="filled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.activityDescription}
            sx={{ backgroundColor: "white", width: "100%" }}
          />
          {formik.touched.activityDescription &&
          formik.errors.activityDescription ? (
            <div>{formik.errors.activityDescription}</div>
          ) : null}
          <Button type="submit" sx={buttonSx}>
            {offEditMode ? "Edit" : "Submit Changes"}
          </Button>
        </form>
      </Card>
      <button onClick={handleReturnToAllActivities}>
        Return To View All Activities
      </button>
    </>
  );
};

export default Activity;
