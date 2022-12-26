import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { Box, width } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CalendarMonth } from "@mui/icons-material";
import axios from "axios";
import { IPortfolio, IVendor } from "../Interface";
import urlcat from "urlcat";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";

const VendorDetails: FC = () => {
  const [vendor, setVendor] = useState<IVendor>({
    email: "",
    contactPersonName: "",
    username: "",
    password: "",
    contactNumber: 0,
    companyName: "",
    registrationNumber: "",
    incorporationDate: new Date(),
    registeredOfficeAddress: "",
    uploadedFiles: [""],
    trackedProjects: [""],
    brandSummary: "",
    portfolio: [""],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const SERVER = import.meta.env.VITE_SERVER;
  const { vendorname } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const vendorUrl = urlcat(SERVER, `/vendors/findByName/${vendorname}`);
    axios
      .get(vendorUrl)
      .then((res) => {
        setVendor(res.data[0]);
        const vendorid = res.data[0]._id;
        const portfoliosUrl = urlcat(
          SERVER,
          `/portfolios/findById/${vendorid}`
        );
        axios
          .get(portfoliosUrl)
          .then((res) => {
            setPortfolios(res.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const navigatePortfolioDetails = (e: any) => {
    navigate(`/${e.target.name}/${e.target.id}`);
  };

  return (
    <>
      <Box sx={{ minWidth: "100%", position: "relative" }}>
        <Box
          maxWidth="md"
          component="img"
          src="https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="vendor-banner"
          sx={{
            mt: "4.6rem",
            height: 324,
            minWidth: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="vendor-profilepic"
          sx={{
            bottom: -80,
            left: 80,
            width: 250,
            height: 250,
            position: "absolute",
            objectFit: "cover",
            border: 8,
            borderColor: "white",
            borderRadius: "5px",
            boxShadow: " 1px 1px 5px 0px black",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: "2rem",
          mb: "10rem",
          ml: "2rem",
          mr: "2rem",
        }}
      >
        <Grid
          spacing={4}
          container
          sx={{
            ml: "2rem",
            mr: "3rem",
            mt: "4rem",
            width: "auto",
          }}
        >
          <Grid item md={3}>
            <Grid
              container
              sx={{
                fontSize: 30,

                pl: 0,
              }}
            >
              <Grid
                item
                md={12}
                sx={{
                  fontWeight: "bold",
                  fontSize: 30,
                  whiteSpace: "no-wrap",
                  overflow: "none",
                }}
              >
                {vendor.companyName}
              </Grid>
              <Grid
                item
                md={12}
                sx={{ fontSize: 18, whiteSpace: "no-wrap", color: "#636363" }}
              >
                @{vendor.username}
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: "1rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <LocationOnIcon
                color="primary"
                sx={{ textAlign: "center", fontSize: 16 }}
              />
              <Typography sx={{ fontSize: 16 }}>Singapore</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarMonth color="primary" sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: 16 }}>
                Joined {format(new Date(vendor.createdAt), "dd MMMM yyyy")}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={9}>
            <Typography
              sx={{
                fontWeight: "800",
                fontSize: 40,
              }}
            >
              Brand Story
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. {vendor.brandSummary}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: "3rem" }}>
          <Typography
            sx={{
              fontSize: 36,
              fontWeight: 800,
              pl: 3,
              borderBottom: 2,
              mx: "3rem",
            }}
          >
            Portfolio
          </Typography>
          <Box sx={{ mx: "5rem", mt: "3rem" }}>
            <Grid container spacing={6}>
              {portfolios?.map((portfolio) => {
                return (
                  <Grid
                    item
                    key={portfolio._id}
                    sm={12}
                    md={4}
                    sx={{ padding: 0 }}
                  >
                    <Card>
                      <CardMedia
                        component="img"
                        height="240"
                        width="150"
                        image={portfolio.images[0]}
                      />
                      <CardContent sx={{ pt: 1, pl: 1, pr: 0, pb: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "medium",
                          }}
                        >
                          {portfolio.portfolioName}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: 15,
                          }}
                        >
                          {portfolio.designTheme}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          pt: 0,
                          pl: 0,
                          pr: 1,
                          pb: 1,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          size="small"
                          name={vendor.username}
                          id={portfolio._id}
                          onClick={navigatePortfolioDetails}
                        >
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default VendorDetails;
