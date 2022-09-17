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
const SERVER = import.meta.env.VITE_SERVER;
const VendorCreateProduct: FC = () => {
  const [design, setDesign] = React.useState("");
  const [housingType, setHousingType] = React.useState("");
  const [data, setData] = useState(0);

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

  const handleDesignChange = (event: SelectChangeEvent) => {
    setDesign(event.target.value);
  };

  const handleHousingChange = (event: SelectChangeEvent) => {
    setHousingType(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      projectName: "",
      housingType: "",
      projectStartDate: "",
      projectEndDate: "",
      designTheme: "",
      clientUsername: "",
      totalCosting: "",
      comments: "",
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
      designTheme: Yup.string().required("Required"),

      // there is a bug here whereby it will show prev error message if re-entering, ask simon
      clientUsername: Yup.string()
        .required("Required")
        .test(
          "value-name",
          "Client username does not exists",
          (name: any): any => {
            const userUrl = urlcat(SERVER, `clients/findByName/${name}`);
            axios
              .get(userUrl)
              .then((res) => setData(res.data.length))
              .catch((err) => console.log(err));
            return data;
          }
        ),
      totalCosting: Yup.string().required("Required"),
      comments: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <h1>Add New Project</h1>
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
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  id="projectName"
                  autoComplete="off"
                  variant="filled"
                  label="Project Name"
                  name="projectName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                />
                {formik.touched.projectName && formik.errors.projectName ? (
                  <div>{formik.errors.projectName}</div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  autoComplete="off"
                  variant="filled"
                  label="Client Username"
                  id="clientUsername"
                  name="clientUsername"
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
            </Grid>
          </Grid>
          <Grid item sm={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl variant="filled" sx={{ width: "100%" }}>
                  <InputLabel required>Design Theme</InputLabel>
                  <Select
                    value={design}
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
                <FormControl variant="filled" sx={{ width: "100%" }}>
                  <InputLabel required>Housing Type</InputLabel>
                  <Select
                    value={housingType}
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
                  autoComplete="off"
                  variant="filled"
                  label="Total Costing"
                  id="totalCosting"
                  name="totalCosting"
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
                  autoComplete="off"
                  variant="filled"
                  label="Project Start Date"
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
                  autoComplete="off"
                  variant="filled"
                  label="Project End Date"
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
              autoComplete="off"
              variant="filled"
              label="Comments"
              id="comments"
              name="comments"
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
            {formik.touched.comments && formik.errors.comments ? (
              <div>{formik.errors.comments}</div>
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
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default VendorCreateProduct;
