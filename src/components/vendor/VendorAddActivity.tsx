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
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

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
      activityName: "",
      activityStatus: "",
      personInCharge: "",
      activityStartDate: "",
      activityEndDate: "",
      description: "",
    },
    validationSchema: Yup.object({
      activityName: Yup.string().required("Required"),
      activityStartDate: Yup.date().default(new Date()),
      activityEndDate: Yup.date()
        .default(new Date())
        .min(
          new Date(),
          `Date should not be later than ${new Date().toLocaleDateString()}`
        )
        .required("Project end date required"),
      activityStatus: Yup.string().required("Required"),
      personInCharge: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const navigate = useNavigate();
  const { projectid } = useParams();

  const handlerBackToProjTable = () => {
    navigate(`/vendor/projects/${projectid}`);
  };
  return (
    <>
      <h1>Add actvity</h1>
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
              id="activityName"
              autoComplete="off"
              variant="filled"
              label="Activity Name"
              name="activityName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
            />
            {formik.touched.activityName && formik.errors.activityName ? (
              <div>{formik.errors.activityName}</div>
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
                    id="activityStatus"
                    name="activityStatus"
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
                {formik.touched.activityStatus &&
                formik.errors.activityStatus ? (
                  <div>{formik.errors.activityStatus}</div>
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
              id="description"
              name="description"
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
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
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
            <Button type="submit" sx={{ backgroundColor: "orange" }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <button onClick={handlerBackToProjTable}>Back to Project Table</button>
    </>
  );
};

export default VendorAddActivity;
