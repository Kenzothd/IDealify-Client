import React, { FC, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, CardContent, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import urlcat from "urlcat";
import axios from "axios";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { IPortfolio2 } from "../Interface";

const projectButtonSx = {
  backgroundColor: "#D9DFE4",
  color: "#444444",
  letterSpacing: "0.1rem",
  pl: "0.75rem",
  pr: "0.75rem",
  "&:hover": {
    backgroundColor: "#D9DFE4",
  },
};

const LandingPage: FC = () => {
  const [images, setImages] = useState<IPortfolio2[]>([]);
  const navigate = useNavigate();
  const SERVER = import.meta.env.VITE_SERVER;
  // const imageUrl = urlcat(SERVER, "/getimages");
  const imageUrl = urlcat(SERVER, "/portfolios");

  useEffect(() => {
    axios
      .get(imageUrl)
      .then((res) => {
        setImages(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const vendorLogin = () => {
    navigate("/vendor/login");
  };
  const clientLogin = () => {
    navigate("/client/login");
  };



  const handleClick = (e: any) => {
    navigate(`/${e.target.name}/${e.target.id}`);
  };

  return (
    <>
      {/* <AppBar>
        <Toolbar sx={{ backgroundColor: "#254D71" }}>
          <Typography variant="h3" flexGrow={1} sx={{ fontWeight: "bold" }}>
            IDealify
          </Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button sx={projectButtonSx} onClick={clientLogin}>
              Homeowners
            </Button>
            <Button sx={projectButtonSx} onClick={vendorLogin}>
              Interior Designers
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> */}
      <Container
        maxWidth="lg"
        sx={{
          mt: '10rem',
          mb: "5rem",
          px: "2rem",
        }}
      >
        <Grid container>
          <Grid item sx={{ display: "flex" }}>
            <LightbulbIcon color="info" />
            <Typography variant="h4" sx={{ fontWeight: "800" }}>
              Home Inspiration
            </Typography>
          </Grid>
          <Grid container sx={{ mt: "1rem", display: "flex" }} spacing={2}>
            {images.slice(0, 12).map((img, index) => (
              <Grid item sm={12} md={3} key={index} sx={{ padding: 0 }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="170"
                    image={img.images[0]}
                  />
                  <CardContent sx={{ pt: 1, pl: 1, pr: 0, pb: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "medium",
                      }}
                    >
                      {img.designTheme}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "small",
                      }}
                    >
                      @{img.vendorId?.username}
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
                      name={img.vendorId?.username}
                      id={img._id}
                      onClick={handleClick}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            {/* <Grid item sm={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  image="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <CardContent>
                  <Typography>Tropical style</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  image="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <CardContent>
                  <Typography>Hollywood Regency</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  width="170"
                  image="https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <CardContent>
                  <Typography>Peter Tan Pte Ltd</Typography>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
