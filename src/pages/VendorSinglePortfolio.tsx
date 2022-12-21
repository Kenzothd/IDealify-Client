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
import { IVendorPortfolio } from "../Interface";

const VendorSinglePortfolio = () => {
  const [design, setDesign] = useState("");
  const [housingType, setHousingType] = useState("");
  const [offEditMode, setOffEditMode] = useState(true);
  const [bigImg, setBigImg] = useState(
    "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600"
  );
  const [smallImg, setSmallImg] = useState([]);
  const [vendorPortfolio, setVendorPortfolio] = useState<IVendorPortfolio>({
    _id: "",
    vendorId: {
      _id: "",
      brandSummary: "",
      companyName: "",
      contactPersonName: "",
      contactNumber: "",
      email: "",
    },
    portfolioName: "",
    housingType: "",
    images: [],
    description: "",
    designTheme: "",
    __v: 0,
  });
  const { vendorid } = useParams();
  const { portfolioid } = useParams();
  const navigate = useNavigate();
  const SERVER = import.meta.env.VITE_SERVER;
  const portfolioUrl = urlcat(SERVER, `/portfolios/id/${portfolioid}`);
  const token: any = sessionStorage.getItem("token");
  useEffect(() => {
    axios
      .get(portfolioUrl)
      .then((res) => {
        setBigImg(res.data.images[0]);
        console.log("res.data", res.data);
        setSmallImg(res.data.images.slice(1, res.data.images.length));
        setVendorPortfolio(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEnlarge = (e: any) => {
    setBigImg(e.target.src);
  };

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
    enableReinitialize: true,
    initialValues: {
      vendorId: vendorPortfolio.vendorId,
      portfolioName: vendorPortfolio.portfolioName,
      housingType: vendorPortfolio.housingType,
      images: vendorPortfolio.images,
      description: vendorPortfolio.description,
      designTheme: vendorPortfolio.designTheme,
    },
    validationSchema: Yup.object().shape({
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
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const url = urlcat(SERVER, `/portfolios/id/${portfolioid}`);
        const body = { ...values, vendorId: vendorid };
        console.log(token);
        console.log("body", body, vendorid, portfolioid);
        axios
          .put(url, body, config)
          .then((res) => {
            setVendorPortfolio(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
  });

  const handleDesignChange = (event: SelectChangeEvent) => {
    setDesign(event.target.value);
  };

  const handleHousingChange = (event: SelectChangeEvent) => {
    setHousingType(event.target.value);
  };

  const handleReturnToProfile = () => {
    navigate(`/vendor/${vendorid}/profile`);
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mb: "5rem",
          px: "2rem",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          {offEditMode ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: 1,
                pb: "0.5rem",
                mb: "2.5rem",
              }}
            >
              <Typography variant="h3" sx={{}}>
                {vendorPortfolio.portfolioName} test
              </Typography>

              <Box
                sx={{
                  display: "inline-block",
                  cursor: "pointer",
                  border: 1,
                  p: "0.3rem",
                  borderRadius: "1rem",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ alignItems: "center", right: "1px" }}
                  onClick={handleReturnToProfile}
                >
                  <KeyboardReturnIcon
                    sx={{ pr: "0.3rem", fontSize: "0.8rem" }}
                  />
                  Back To Profile
                </Typography>
              </Box>
            </Box>
          ) : (
            <TextField
              required
              id="portfolioName"
              autoComplete="off"
              name="portfolioName"
              value={formik.values.portfolioName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%", mb: "2.5rem" }}
            />
          )}
          {formik.touched.portfolioName && formik.errors.portfolioName ? (
            <div>{formik.errors.portfolioName}</div>
          ) : null}
          <Grid container spacing={6} sx={{ mb: "1rem" }}>
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
                {smallImg.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    style={{ width: "31%", borderRadius: 15 }}
                    onClick={handleEnlarge}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container sx={{ mb: "1.2rem" }} spacing={2}>
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
                      {vendorPortfolio.designTheme}
                    </Typography>
                  ) : (
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        value={formik.values.designTheme}
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
                      {vendorPortfolio.housingType}
                    </Typography>
                  ) : (
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        value={formik.values.housingType}
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
                  {vendorPortfolio.description}
                </Typography>
              ) : (
                <TextField
                  required
                  value={formik.values.description}
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
                      mb: "1.2rem",
                    },
                  }}
                />
              )}

              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}

              {offEditMode ? (
                <></>
              ) : (
                <>
                  <Typography
                    variant="body2"
                    sx={{ mb: "0.5rem", color: "#444444" }}
                  >
                    UPLOAD IMAGES
                  </Typography>

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
                </>
              )}
              {formik.touched.images && formik.errors.images ? (
                <div>{formik.errors.images}</div>
              ) : null}
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              textAlign: "center",
            }}
          >
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
