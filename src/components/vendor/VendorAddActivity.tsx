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
import { Box, Container } from "@mui/system";

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
  const [activity, setActivity] = useState("");
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
      activityStartDate: Yup.date(),
      activityEndDate: Yup.date()
        .min(
          Yup.ref("activityStartDate"),
          "end date can't be before start date"
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

  return (
    <Container
      maxWidth="md"
      sx={{
        mb: "5rem",
        pr: "2rem",
        pl: "2rem",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ mb: "3rem", display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h3">New Activity</Typography>
          <Box
            sx={{
              display: "inline-block",
              mb: "1.5rem",
              cursor: "pointer",
              border: 1,
              p: "0.3rem",
              borderRadius: "1rem",
            }}
          >
            <Typography
              variant="body1"
              sx={{ alignItems: "center" }}
              onClick={handleReturnToActivities}
            >
              <KeyboardReturnIcon sx={{ pr: "0.3rem", fontSize: "0.8rem" }} />
              All Activities
            </Typography>
          </Box>
        </Grid>

        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                ACTIVITY NAME
              </Typography>

              <TextField
                required
                id="activityTitle"
                autoComplete="off"
                name="activityTitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
              />
              {formik.touched.activityTitle && formik.errors.activityTitle ? (
                <div>{formik.errors.activityTitle}</div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: "0.5rem", color: "#444444" }}
                  >
                    ACTIVITY STATUS
                  </Typography>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={activity}
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

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: "0.5rem", color: "#444444" }}
                  >
                    PERSON IN CHARGE
                  </Typography>
                  <TextField
                    required
                    autoComplete="off"
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

            <Grid item xs={12}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: "0.5rem", color: "#444444" }}
                  >
                    ACTIVITY START DATE
                  </Typography>

                  <TextField
                    required
                    autoComplete="off"
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

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: "0.5rem", color: "#444444" }}
                  >
                    ACTIVITY END DATE
                  </Typography>

                  <TextField
                    required
                    autoComplete="off"
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

            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                DESCRIPTION
              </Typography>

              <TextField
                required
                autoComplete="off"
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
            <Grid item sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                sx={{
                  background: "#254D71",
                  color: "white",
                  letterSpacing: "0.2rem",
                  mt: "1rem",
                  pl: "6rem",
                  pr: "6rem",
                  "&:hover": {
                    backgroundColor: "#173754",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default VendorAddActivity;
