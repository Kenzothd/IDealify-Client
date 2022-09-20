import React, { FC, useState, useEffect } from "react";
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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import format from "date-fns/format";
import { useNavigate, useParams } from "react-router-dom";
import { IProjectTwo } from "../../Interface";

const SERVER = import.meta.env.VITE_SERVER;
const buttonSx = {
  backgroundColor: "#c9caa2",
  color: "white",
  display: "flex",
  margin: "3% auto",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: 1,
  borderRadius: 2,
  padding: "0.5rem 1.5rem",
};

const VendorUpdateProject: FC = () => {
  const [design, setDesign] = React.useState("");
  const [housingType, setHousingType] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [username, setUsername] = useState(0);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");

  const [offEditMode, setOffEditMode] = useState(true);
  const [project, setProject] = useState<IProjectTwo>({
    vendorId: "",
    clientId: "",
    projectName: "",
    housingType: "",
    projectStartDate: new Date(),
    projectEndDate: new Date(),
    projectStatus: "",
    uploadedFiles: ["url", "url", "url"],
    description: "",
    designTheme: "",
    totalCosting: 0,
    comments: "",
  });
  const navigate = useNavigate();
  const token: any = sessionStorage.getItem("token");
  const { projectid, vendorid } = useParams();

  useEffect(() => {
    const url = urlcat(SERVER, `/projects/id/${projectid}`);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token);
    axios
      .get(url, config)
      .then((res) => {
        setProject(res.data[0]);
        setClientId(res.data[0].clientId);
        console.log(res.data[0].clientId);
        console.log(res.data);
        const clientUrl = urlcat(SERVER, `/clients/id/${res.data[0].clientId}`);
        // const clientUrl = urlcat(
        //   SERVER,
        //   `/clients/id/63295c7df69465d5dd867060`
        // );
        axios
          .get(clientUrl, config)
          .then((res) => setClientName(res.data.username));
      })
      .catch((err) => console.log(err));
  }, []);

  const designOptions = [
    "Modern",
    "Mid-century modern",
    "Minimalist",
    "Scandinavian",
    "Industrial style",
    "Contemporary interior design",
    "Urban style",
    "Traditional / Classic style",
    "Transitional style",
    "Art Deco style",
    "Country style",
    "Coastal style",
    "Shabby chic",
    "Eclectic",
    "Vintage style",
    "Asian / Zen interior design",
    "Bohemian style",
    "Tropical style",
    "Rustic style ",
    "Hollywood Regency",
    "Modern farmhouse",
    "Black & White",
    "Others",
  ];

  const housingOptions = [
    "1-Room Flat (HDB)",
    "2-Room Flat (HDB)",
    "3-Room Flat (HDB)",
    "4-Room Flat (HDB)",
    "5-Room Flat (HDB)",
    "Executive Flat (HDB)",
    "Studio Apartment (HDB)",
    "Detached House",
    "Semi-detached House",
    "Terrace House",
    "Condominium",
    "Executive Condominium",
    "Apartment",
    "Others",
  ];

  const statusOptions = ["Upcoming", "In Progress", "Completed", "Cancelled"];

  const handleDesignChange = (event: SelectChangeEvent) => {
    setDesign(event.target.value);
  };

  const handleHousingChange = (event: SelectChangeEvent) => {
    setHousingType(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: project.projectName,
      housingType: project.housingType,
      projectStartDate: format(
        new Date(project.projectStartDate),
        "yyyy-MM-dd"
      ),
      projectEndDate: format(new Date(project.projectEndDate), "yyyy-MM-dd"),
      projectStatus: project.projectStatus,
      designTheme: project.designTheme,
      clientUsername: clientName,
      totalCosting: project.totalCosting,
      description: project.description,
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Required"),
      housingType: Yup.string().required("Required"),
      projectStartDate: Yup.date().default(new Date()),
      projectEndDate: Yup.date()
        .default(new Date())
        .min(
          new Date(),
          `Date should not be later than ${new Date().toLocaleDateString()}`
        )
        .required("Project end date required"),
      projectStatus: Yup.string().required("Required"),
      designTheme: Yup.string().required("Required"),
      // there is a bug here whereby it will show prev error message if re-entering, ask simon
      clientUsername: Yup.string()
        .required("Required")
        .test(
          "value-name",
          "Client username does not exist",
          (name: any): boolean => {
            const userUrl = urlcat(SERVER, `clients/findByName/${name}`);
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            axios
              .get(userUrl, config)
              .then((res) => {
                setUsername(res.data.length);
                // setClientId(res.data[0]._id);
                console.log("get done");
              })
              .catch((err) => console.log(err));
            return username === 0 ? false : true;
          }
        ),
      totalCosting: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const url = urlcat(SERVER, `/projects/id/${projectid}`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        vendorId: vendorid,
        clientId: clientId,
        projectName: values.projectName,
        housingType: values.housingType,
        projectStartDate: values.projectStartDate,
        projectEndDate: values.projectEndDate,
        projectStatus: values.projectStatus,
        uploadedFiles: ["url", "url", "url"],
        description: values.description,
        designTheme: values.designTheme,
      };

      axios
        .put(url, body, config)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
  });

  const handleBackToProjectView = () => {
    navigate(`/vendor/${vendorid}/projects/${projectid}`);
  };

  return (
    <>
      <h1>Edit Project</h1>
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  disabled={offEditMode}
                  id="projectName"
                  autoComplete="off"
                  variant="filled"
                  label="Project Name"
                  value={formik.values.projectName}
                  name="projectName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                />
                {formik.touched.projectName && formik.errors.projectName ? (
                  <div>{formik.errors.projectName}</div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  disabled={offEditMode}
                  autoComplete="off"
                  variant="filled"
                  label="Client Username"
                  id="clientUsername"
                  name="clientUsername"
                  value={formik.values.clientUsername}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                />
                {formik.touched.clientUsername &&
                formik.errors.clientUsername ? (
                  <div>{formik.errors.clientUsername}</div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={3.9} md={3.9}>
                <FormControl
                  disabled={offEditMode}
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  <InputLabel required>Project Status</InputLabel>
                  <Select
                    // value={status}
                    value={formik.values.projectStatus}
                    label="Project Status"
                    id="projectStatus"
                    name="projectStatus"
                    onChange={(e) => {
                      handleStatusChange(e);
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    sx={{ width: "100%" }}
                  >
                    {statusOptions.map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.projectStatus && formik.errors.projectStatus ? (
                  <div>{formik.errors.projectStatus}</div>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl
                  disabled={offEditMode}
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  <InputLabel required>Design Theme</InputLabel>
                  <Select
                    // value={design}
                    value={formik.values.designTheme}
                    label="Design Theme"
                    id="designTheme"
                    name="designTheme"
                    onChange={(e) => {
                      handleDesignChange(e);
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    sx={{ width: "100%" }}
                  >
                    {designOptions.map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.designTheme && formik.errors.designTheme ? (
                  <div>{formik.errors.designTheme}</div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl
                  disabled={offEditMode}
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  <InputLabel required>Housing Type</InputLabel>
                  <Select
                    // value={housingType}
                    value={formik.values.housingType}
                    label="Housing Type"
                    id="housingType"
                    name="housingType"
                    onChange={(e) => {
                      handleHousingChange(e);
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    sx={{ width: "100%" }}
                  >
                    {housingOptions.map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.housingType && formik.errors.housingType ? (
                  <div>{formik.errors.housingType}</div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  disabled={offEditMode}
                  autoComplete="off"
                  variant="filled"
                  label="Total Costing"
                  id="totalCosting"
                  name="totalCosting"
                  value={formik.values.totalCosting}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                />
                {formik.touched.totalCosting && formik.errors.totalCosting ? (
                  <div>{formik.errors.totalCosting}</div>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  required
                  disabled={offEditMode}
                  autoComplete="off"
                  variant="filled"
                  label="Project Start Date"
                  value={formik.values.projectStartDate}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="projectStartDate"
                  name="projectStartDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                />
                {formik.touched.projectStartDate &&
                formik.errors.projectStartDate ? (
                  <div>{formik.errors.projectStartDate}</div>
                ) : null}
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  required
                  disabled={offEditMode}
                  autoComplete="off"
                  variant="filled"
                  label="Project End Date"
                  value={formik.values.projectEndDate}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="projectEndDate"
                  name="projectEndDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                />
                {formik.touched.projectEndDate &&
                formik.errors.projectEndDate ? (
                  <div>{formik.errors.projectEndDate}</div>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              required
              disabled={offEditMode}
              autoComplete="off"
              variant="filled"
              label="Description"
              id="description"
              name="description"
              value={formik.values.description}
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
            <Button type="submit" sx={buttonSx}>
              {offEditMode ? "Edit" : "Submit Changes"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Button sx={buttonSx} onClick={handleBackToProjectView}>
        Back to Project View
      </Button>
    </>
  );
};

export default VendorUpdateProject;
