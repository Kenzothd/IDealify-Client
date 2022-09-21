import React, { useContext, useState, useEffect, FC } from "react";
import {
  Button,
  Card,
  TextField,
  Typography,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
const SERVER = import.meta.env.VITE_SERVER;
import format from "date-fns/format";
import sub from "date-fns/sub";
import { useNavigate, useParams } from "react-router-dom";
import { IActivities } from "../../Interface";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const projectButtonSx = {
  backgroundColor: "#74ace4",
  color: "white",
  margin: "1% 4%",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: 1,
  borderRadius: 2,
  padding: "0.5rem 1.5rem",
};
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

const buttonDeleteSx = {
  backgroundColor: "red",
  color: "white",
  margin: "1% 1%",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: 1,
  borderRadius: 2,
  padding: "0.5rem 1.5rem",
};

const Activity: FC = () => {
  const { vendorid, projectid, activityid } = useParams();
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

  const activityStatusOptions = [
    "Pending",
    "Upcoming",
    "In Progress",
    "Completed",
    "Cancelled",
  ];
  useEffect(() => {
    const url = urlcat(SERVER, `/activities/id/${activityid}`);
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
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log(values);
        const url = urlcat(SERVER, `/activities/id/${activityid}`);
        const body = { ...values, projectId: projectid };
        console.log(body);
        axios
          .put(url, body, config)
          .then((res) => {
            setActivity(res.data);
            navigate(`/vendor/${vendorid}/projects/${projectid}`);
          })
          .catch((err) => console.log(err));
      }
    },
  });

  let bgColor: string;
  switch (activity.status) {
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

  const handleReturnToAllActivities = () => {
    navigate(`/vendor/${vendorid}/projects/${projectid}`);
  };
  const handleStatusChange = (event: SelectChangeEvent) => {
    setActivity({ ...activity, status: event.target.value });
  };

  const handleDeleteActivity = () => {
    console.log("handle delete activity");
    const deleteUrl = urlcat(SERVER, `/activities/id/${activityid}`);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(deleteUrl, config)
      .then((res) => {
        console.log(res.data);
        navigate(`/vendor/${vendorid}/projects/${projectid}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ padding: "0% 5%" }}>
        <Grid item md={12}>
          <Grid container>
            <Grid item md={8}>
              <Grid container>
                <Typography variant="h2">Edit Activity</Typography>
              </Grid>
            </Grid>
            <Grid item md={4}>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Button
                  sx={projectButtonSx}
                  onClick={handleReturnToAllActivities}
                >
                  <KeyboardReturnIcon sx={{ paddingRight: "10px" }} />
                  All Activities
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              required
              disabled={offEditMode}
              autoComplete="off"
              id="activityTitle"
              name="activityTitle"
              label="Activity Title"
              variant="filled"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.activityTitle}
              sx={{ backgroundColor: "white", width: "100%" }}
            />
            {formik.touched.activityTitle && formik.errors.activityTitle ? (
              <div>{formik.errors.activityTitle}</div>
            ) : null}
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
            <FormControl
              disabled={offEditMode}
              variant="filled"
              sx={{ width: "100%" }}
            >
              <InputLabel required>Activity Status</InputLabel>
              <Select
                value={formik.values.status}
                label="Activity Status"
                id="activityStatus"
                name="activityStatus"
                onChange={(e) => {
                  handleStatusChange(e);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
              >
                {activityStatusOptions.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.touched.status && formik.errors.status ? (
              <div>{formik.errors.status}</div>
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
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="submit" sx={buttonSx}>
                {offEditMode ? "Edit" : "Submit Changes"}
              </Button>
              {!offEditMode && (
                <Button
                  sx={buttonSx}
                  onClick={() => {
                    setOffEditMode(!offEditMode);
                  }}
                >
                  Cancel Edit
                </Button>
              )}
              <Button
                disabled={!offEditMode}
                sx={buttonDeleteSx}
                onClick={handleDeleteActivity}
              >
                Delete Activity
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Activity;
