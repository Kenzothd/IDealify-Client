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

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const LandingPage = (props: Props) => {
  const navigate = useNavigate();
  const SERVER = import.meta.env.VITE_SERVER;
  const imageUrl = urlcat(SERVER, "/getimages");
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(imageUrl)
      .then((res) => setImages(res.data))
      .catch((error) => console.log(error));
  }, []);
  const vendorLogin = () => {
    navigate("/vendor/login");
  };
  const clientLogin = () => {
    navigate("/client/login");
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h3" flexGrow={1}>
              <LightbulbIcon sx={{ paddingRight: "10px" }} /> Idealify
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button sx={projectButtonSx} onClick={clientLogin}>
                <TouchAppIcon sx={{ paddingRight: "10px" }} />
                Homeowners
              </Button>
              <Button sx={projectButtonSx} onClick={vendorLogin}>
                <TouchAppIcon sx={{ paddingRight: "10px" }} /> Interior
                Designers
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container
        maxWidth="lg"
        sx={{
          mt: "2.5rem",
          mb: "5rem",
          px: "2rem",
        }}
      >
        <Grid container>
          <Grid item>
            <Typography variant="h4">Home Inspiration</Typography>
          </Grid>
          <Grid container sx={{ mt: "1rem", display: "flex" }} spacing={2}>
            {images.slice(0, 12).map((img, index) => (
              <Grid item sm={12} md={3} key={index}>
                <Card>
                  <CardMedia component="img" height="170" image={img} />
                  {/* <CardContent>
                    <Typography>Urban style</Typography>
                  </CardContent> */}
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
