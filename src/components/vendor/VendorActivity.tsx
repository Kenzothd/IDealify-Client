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
  Container,
  Box,
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

const VendorActivity: FC = () => {
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
  }, [offEditMode]);

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
            sx={{
              mb: "3rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h3">{activity.activityTitle}</Typography>

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
                onClick={handleReturnToAllActivities}
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
                  disabled={offEditMode}
                  required
                  autoComplete="off"
                  id="activityTitle"
                  name="activityTitle"
                  value={formik.values.activityTitle}
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
                    <FormControl disabled={offEditMode} sx={{ width: "100%" }}>
                      <Select
                        value={formik.values.status}
                        id="status"
                        name="status"
                        onChange={(e) => {
                          // handleActivityChange(e);
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
                      disabled={offEditMode}
                      autoComplete="off"
                      id="personInCharge"
                      name="personInCharge"
                      type="text"
                      value={formik.values.personInCharge}
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
                      disabled={offEditMode}
                      autoComplete="off"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      id="activityStartDate"
                      name="activityStartDate"
                      value={formik.values.activityStartDate}
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
                      disabled={offEditMode}
                      autoComplete="off"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      id="activityEndDate"
                      name="activityEndDate"
                      value={formik.values.activityEndDate}
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
                  disabled={offEditMode}
                  required
                  autoComplete="off"
                  id="activityDescription"
                  name="activityDescription"
                  type="text"
                  value={formik.values.activityDescription}
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
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  itemAlign: "center",
                  gap: "1rem",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    background: "#254D71",
                    color: "white",
                    letterSpacing: "0.2rem",
                    mt: "3rem",
                    px: "2rem",
                    "&:hover": {
                      backgroundColor: "#113352 ",
                    },
                  }}
                >
                  {offEditMode ? "Edit" : "Submit Changes"}
                </Button>
                {!offEditMode && (
                  <Button
                    sx={{
                      background: "#254D71",
                      color: "white",
                      letterSpacing: "0.2rem",
                      mt: "3rem",
                      px: "2rem",

                      "&:hover": {
                        backgroundColor: "#1C4163",
                      },
                    }}
                    onClick={() => {
                      setActivity({
                        ...activity,
                        activityDescription: "rerender initial state",
                      });
                      setOffEditMode(!offEditMode);
                    }}
                  >
                    Cancel Edit
                  </Button>
                )}
                <Button
                  sx={{
                    background: "#AC361D",
                    color: "white",
                    letterSpacing: "0.2rem",
                    mt: "3rem",
                    px: "2rem",
                    "&:hover": {
                      backgroundColor: "#802310",
                    },
                  }}
                  onClick={handleDeleteActivity}
                >
                  Delete Activity
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default VendorActivity;
