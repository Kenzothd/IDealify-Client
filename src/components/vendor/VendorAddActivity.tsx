import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import urlcat from "urlcat";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import EditIcon from "@mui/icons-material/Edit";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;
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
const VendorAddActivity: FC = () => {
  const [activity, setActivity] = React.useState("");
  const token: any = sessionStorage.getItem("token");

  const activityStatusOptions = [
    "Pending",
    "Upcoming",
    "In Progress",
    "Completed",
    "Cancelled",
  ];

  const handleActivityChange = (event: SelectChangeEvent) => {
    setActivity(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      activityTitle: "",
      status: "",
      personInCharge: "",
      activityStartDate: "",
      activityEndDate: "",
      activityDescription: "",
    },
    validationSchema: Yup.object({
      activityTitle: Yup.string().required("Required"),
      activityStartDate: Yup.date().default(new Date()),
      activityEndDate: Yup.date()
        .default(new Date())
        .min(
          new Date(),
          `Date should not be later than ${new Date().toLocaleDateString()}`
        )
        .required("Project end date required"),
      status: Yup.string().required("Required"),
      personInCharge: Yup.string().required("Required"),
      activityDescription: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const url = urlcat(SERVER, `/activities`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const body = { ...values, projectId: projectid };
      axios
        .post(url, body, config)
        .then((res) => {
          console.log(res.data);
          navigate(`/vendor/${vendorid}/projects/${projectid}`);
        })
        .catch((err) => console.log(err));
      console.log(body);
    },
  });

  const navigate = useNavigate();
  const { vendorid, projectid } = useParams();

  const handleReturnToActivities = () => {
    console.log("return to activities");
    navigate(`/vendor/${vendorid}/projects/${projectid}`);
  };

  const handleReturnToAllProjects = () => {
    console.log("return to all projects");
    navigate(`/vendor/${vendorid}/dashboard`);
  };
  return (
    <>
      <Grid container spacing={2} sx={{ padding: "0% 5%" }}>
        <Grid item md={12}>
          <Grid container>
            <Grid item md={6}>
              <Typography variant="h2">Add Activity</Typography>
            </Grid>
            <Grid item md={6} sx={{ display: "flex", justifyContent: "right" }}>
              <Button onClick={handleReturnToActivities} sx={buttonSx}>
                <KeyboardReturnIcon sx={{ paddingRight: "10px" }} />
                All Activities
              </Button>
              <Button onClick={handleReturnToAllProjects} sx={buttonSx}>
                <KeyboardReturnIcon sx={{ paddingRight: "10px" }} />
                All Projects
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item sm={12} md={12}>
                <TextField
                  required
                  id="activityTitle"
                  autoComplete="off"
                  variant="filled"
                  label="Activity Name"
                  name="activityTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                />
                {formik.touched.activityTitle && formik.errors.activityTitle ? (
                  <div>{formik.errors.activityTitle}</div>
                ) : null}
              </Grid>
              <Grid item sm={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl variant="filled" sx={{ width: "100%" }}>
                      <InputLabel required>Activity Status</InputLabel>
                      <Select
                        value={activity}
                        label="Activity Status"
                        id="status"
                        name="status"
                        onChange={(e) => {
                          handleActivityChange(e);
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
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      autoComplete="off"
                      variant="filled"
                      label="Person In Charge"
                      id="personInCharge"
                      name="personInCharge"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{ width: "100%" }}
                    />
                    {formik.touched.personInCharge &&
                    formik.errors.personInCharge ? (
                      <div>{formik.errors.personInCharge}</div>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6}>
                    <TextField
                      required
                      autoComplete="off"
                      variant="filled"
                      label="Activity Start Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      id="activityStartDate"
                      name="activityStartDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{ width: "100%" }}
                    />
                    {formik.touched.activityStartDate &&
                    formik.errors.activityStartDate ? (
                      <div>{formik.errors.activityStartDate}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <TextField
                      required
                      autoComplete="off"
                      variant="filled"
                      label="Activity End Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      id="activityEndDate"
                      name="activityEndDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{ width: "100%" }}
                    />
                    {formik.touched.activityEndDate &&
                    formik.errors.activityEndDate ? (
                      <div>{formik.errors.activityEndDate}</div>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  autoComplete="off"
                  variant="filled"
                  label="Description"
                  id="activityDescription"
                  name="activityDescription"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: 200,
                    },
                  }}
                />
                {formik.touched.activityDescription &&
                formik.errors.activityDescription ? (
                  <div>{formik.errors.activityDescription}</div>
                ) : null}
              </Grid>
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default VendorAddActivity;
