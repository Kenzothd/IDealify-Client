import React from "react";
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPortfolio } from "../Interface";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const VendorSinglePortfolio = () => {
  const [design, setDesign] = useState("");
  const [housingType, setHousingType] = useState("");
  const [offEditMode, setOffEditMode] = useState(true);
  const [bigImg, setBigImg] = useState(
    "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600"
  );
  const [vendorPortfolio, setVendorPortfolio] = useState({});
  const { vendorid } = useParams();
  const { portfolioid } = useParams();
  const SERVER = import.meta.env.VITE_SERVER;
  const portfolioUrl = urlcat(SERVER, `/portfolios/id/${portfolioid}`);

  useEffect(() => {
    axios
      .get(portfolioUrl)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleEnlarge = (e: any) => {
    setBigImg(e.target.src);
  };

  const itemData = [
    {
      img: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Breakfast",
    },
    {
      img: "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Burger",
    },
    {
      img: "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Camera",
    },
    // {
    //   img: "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=600",
    //   title: "Coffee",
    // },
    // {
    //   img: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=600",
    //   title: "Hats",
    // },
  ];

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
  const formik = useFormik({
    initialValues: {
      vendorId: "",
      portfolioName: "Test",
      housingType: "4-Room Flat (HDB)",
      images: ["url"],
      description: "best",
      designTheme: "Minimalist",
    },
    validationSchema: Yup.object({
      portfolioName: Yup.string().max(35).required("Required"),
      housingType: Yup.string().required("Required"),
      designTheme: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      images: Yup.mixed().required("A file is required"),
    }),
    onSubmit: (values) => {
      if (offEditMode) {
        setOffEditMode(!offEditMode);
      } else {
        setOffEditMode(!offEditMode);
      }
    },
  });

  const handleDesignChange = (event: SelectChangeEvent) => {
    setDesign(event.target.value);
  };

  const handleHousingChange = (event: SelectChangeEvent) => {
    setHousingType(event.target.value);
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: "5rem",
          mb: "5rem",
          pr: "2rem",
          pl: "2rem",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={6} sx={{ mb: "5rem" }}>
            <Grid item xs={12}>
              {offEditMode ? (
                <Typography
                  variant="h3"
                  sx={{
                    borderBottom: 1,
                    borderBottomColor: "#444444",
                    mb: "1rem",
                    pb: "0.5rem",
                  }}
                >
                  {formik.values.portfolioName}
                </Typography>
              ) : (
                <TextField
                  required
                  id="portfolioName"
                  autoComplete="off"
                  name="portfolioName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                />
              )}
            </Grid>
            {formik.touched.portfolioName && formik.errors.portfolioName ? (
              <div>{formik.errors.portfolioName}</div>
            ) : null}

            <Grid item xs={12} sm={6}>
              <img
                src={bigImg}
                alt="Hats"
                style={{ width: "99%", marginBottom: "1rem", borderRadius: 15 }}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: "3%",
                  flexWrap: "wrap",
                  rowGap: "0.8rem",
                }}
              >
                {itemData.map((item, index) => (
                  <img
                    key={index}
                    src={item.img}
                    alt={item.title}
                    style={{ width: "31%", borderRadius: 15 }}
                    onClick={handleEnlarge}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: "5rem" }}>
              <Grid container sx={{ mb: "2rem" }} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: "0.5rem", color: "#444444" }}
                  >
                    DESIGN THEME
                  </Typography>

                  {offEditMode ? (
                    <Typography
                      variant="h5"
                      sx={{ mb: "0.5rem", color: "#444444" }}
                    >
                      {formik.values.designTheme}
                    </Typography>
                  ) : (
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
                  )}

                  {formik.touched.designTheme && formik.errors.designTheme ? (
                    <div>{formik.errors.designTheme}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: "0.5rem", color: "#444444" }}
                  >
                    HOUSING TYPE
                  </Typography>

                  {offEditMode ? (
                    <Typography
                      variant="h5"
                      sx={{ mb: "0.5rem", color: "#444444" }}
                    >
                      {formik.values.housingType}
                    </Typography>
                  ) : (
                    <FormControl sx={{ width: "100%" }}>
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
                  )}

                  {formik.touched.housingType && formik.errors.housingType ? (
                    <div>{formik.errors.housingType}</div>
                  ) : null}
                </Grid>
              </Grid>

              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                DESCRIPTION
              </Typography>

              {offEditMode ? (
                <Typography
                  variant="h5"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  Minimal to the max
                </Typography>
              ) : (
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
              )}

              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  UPLOAD IMAGES
                </Typography>
              </Grid>
              {offEditMode ? (
                <p></p>
              ) : (
                <TextField
                  id="images"
                  name="images"
                  inputProps={{
                    multiple: true,
                  }}
                  type="file"
                  onChange={(event: any) => {
                    formik.setFieldValue("images", event.currentTarget.files);
                  }}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                  hidden
                />
              )}
              {formik.touched.images && formik.errors.images ? (
                <div>{formik.errors.images}</div>
              ) : null}
            </Grid>
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
                  backgroundColor: "#173754",
                },
              }}
            >
              {offEditMode ? "Edit" : "Submit Changes"}
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default VendorSinglePortfolio;
