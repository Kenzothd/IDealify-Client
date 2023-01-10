import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";

const FeaturedVendors = () => {
  const [vendors, setVendors] = useState([
    {
      email: "admin123@hotmail.com",
      contactPersonName: "Admin",
      username: "admin123",
      contactNumber: 92839485,
      companyName: "Admin Pte Ltd",
      registrationNumber: "201783726D",
      incorporationDate: new Date("2022-03-25"),
      registeredOfficeAddress: "123 Admin Road Singapore 123456",
      uploadedFiles: "url",
      brandSummary: "some say best in batam",
      // portfolio: ["63331b993cbab61f618c7fe6"],
    },
    {
      email: "faith@hotmail.com",
      contactPersonName: "faith",
      username: "faith123",
      contactNumber: 90015846,
      companyName: "Faith Pte Ltd",
      registrationNumber: "201784526D",
      incorporationDate: new Date("2021-05-25"),
      registeredOfficeAddress: "123 Faith Road Singapore 123456",
      uploadedFiles: "url",
      brandSummary: "some say best in johor",
      // portfolio: ["url", "url", "url"],
    },
  ]);

  const SERVER = import.meta.env.VITE_SERVER;
  const vendorUrl = urlcat(SERVER, `/vendors`);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(vendorUrl).then((res) => setVendors(res.data));
  }, []);

  const handleClick = (event: any) => {
    navigate(`/${event.target.id}`);
  };

  return (
    <Grid container sx={{ mt: 8 }}>
      <Typography variant="h3" sx={{ fontWeight: "600" }}>
        Featured Vendors
      </Typography>

      <Grid container sx={{ mt: "2rem", display: "flex" }} spacing={2}>
        {vendors.map((vendor, idx) => (
          <Grid key={idx} item sm={12} md={3} sx={{ padding: 0 }}>
            <Card>
              <CardMedia
                component="img"
                height="170"
                image={
                  "https://www.taxmann.com/post/wp-content/uploads/2021/04/company-concept-illustration_114360-2581.jpg"
                }
              />
              <CardContent sx={{ pt: 1, pl: 1, pr: 0, pb: 0 }}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "medium",
                    "&:hover": {
                      color: "gray",
                    },
                    cursor: "pointer",
                  }}
                  id={vendor.username}
                  onClick={handleClick}
                >
                  {vendor.companyName}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "small",
                  }}
                >
                  {vendor.brandSummary}
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
                <Button size="small" onClick={handleClick} id={vendor.username}>
                  View portfolio
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default FeaturedVendors;
