import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import urlcat from "urlcat";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IPortfolio } from "../../Interface";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const SERVER = import.meta.env.VITE_SERVER;

const VendorPortfolioForm: FC = () => {
  const [design, setDesign] = React.useState("");
  const [housingType, setHousingType] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [username, setUsername] = useState(0);
  const [clientId, setClientId] = useState("");
  // const [data, setData] = useState(0);
  const navigate = useNavigate();
  const token: any = sessionStorage.getItem("token");
  const { vendorid } = useParams();

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
    initialValues: {
      portfolioName: "",
      housingType: "",
      projectStartDate: "",
      projectEndDate: "",
      projectStatus: "",
      designTheme: "",
      clientUsername: "",
      totalCosting: "",
      description: "",
    },
    validationSchema: Yup.object({
      portfolioName: Yup.string().max(35).required("Required"),
      housingType: Yup.string().required("Required"),
      projectStartDate: Yup.date(),
      projectEndDate: Yup.date()
        .min(Yup.ref("projectStartDate"), "end date can't be before start date")
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
                setClientId(res.data[0]._id);
              })
              .catch((err) => console.log(err));
            return username === 0 ? false : true;
          }
        ),
      totalCosting: Yup.number()
        .typeError("You must specify a number")
        .required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const url = urlcat(SERVER, `/projects/vendor/${vendorid}`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const body: IPortfolio = {
        vendorId: vendorid,
        clientId: clientId,
        portfolioName: values.portfolioName,
        housingType: values.housingType,
        projectStartDate: new Date(values.projectStartDate),
        projectEndDate: new Date(values.projectEndDate),
        projectStatus: values.projectStatus,
        uploadedFiles: ["url", "url", "url"],
        description: values.description,
        designTheme: values.designTheme,
        totalCosting: Number(values.totalCosting),
      };
      axios
        .post(url, body, config)
        .then((res) => {
          console.log(res.data);
          navigate(`/vendor/${vendorid}/dashboard`);
        })
        .catch((err) => console.log(err));
    },
  });

  const returnToProfile = () => {
    navigate(`/vendor/${vendorid}/profile`);
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
          <Typography variant="h3">New Portfolio</Typography>
          <Box
            sx={{
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
              onClick={returnToProfile}
            >
              <KeyboardReturnIcon sx={{ pr: "0.3rem", fontSize: "0.8rem" }} />
              Profile
            </Typography>
          </Box>
        </Grid>

        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item sm={12}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                PORTFOLIO NAME
              </Typography>
              <TextField
                required
                id="portfolioName"
                autoComplete="off"
                name="portfolioName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
              />
              {formik.touched.portfolioName && formik.errors.portfolioName ? (
                <div>{formik.errors.portfolioName}</div>
              ) : null}
            </Grid>

            <Grid item sm={12}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: "0.5rem", color: "#444444" }}
                  >
                    DESIGN THEME
                  </Typography>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={design}
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

                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <Typography
                      variant="body2"
                      sx={{ mb: "0.5rem", color: "#444444" }}
                    >
                      HOUSING TYPE
                    </Typography>

                    <Select
                      value={housingType}
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
              </Grid>
            </Grid>

            <Grid item sm={12}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                DESCRIPTION
              </Typography>
              <TextField
                required
                autoComplete="off"
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
            {/* <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                DESCRIPTION
              </Typography>
              <TextField
                required
                autoComplete="off"
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
            </Grid> */}
          </Grid>
          <Grid item sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              sx={{
                background: "#254D71",
                color: "white",
                letterSpacing: "0.2rem",
                mt: "3rem",
                pl: "6rem",
                pr: "6rem",
                "&:hover": {
                  backgroundColor: "#254D71",
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default VendorPortfolioForm;
