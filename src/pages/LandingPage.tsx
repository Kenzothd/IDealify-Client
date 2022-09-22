import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, CardContent, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

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
  const navigate = useNavigate();

  const vendorLogin = () => {
    navigate("/vendor/login");
  };
  const clientLogin = () => {
    navigate("/client/login");
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: "2.5rem",
          mb: "5rem",
          px: "2rem",
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
            <Typography variant="h3">Idealify</Typography>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button sx={projectButtonSx} onClick={clientLogin}>
                User Sign In
              </Button>
              <Button sx={projectButtonSx} onClick={vendorLogin}>
                ID Sign In
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="h4">Home Inspiration</Typography>
          </Grid>
          <Grid
            container
            sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}
            spacing={2}
          >
            <Grid item sm={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  image="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <CardContent>
                  <Typography>Peter Tan Pte Ltd</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  image="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <CardContent>
                  <Typography>Peter Tan Pte Ltd</Typography>
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
                  <Typography>Peter Tan Pte Ltd</Typography>
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
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}
            spacing={2}
          >
            <Grid item sm={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  image="https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <CardContent>
                  <Typography>Peter Tan Pte Ltd</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  image="https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <CardContent>
                  <Typography>Peter Tan Pte Ltd</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  image="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <CardContent>
                  <Typography>Peter Tan Pte Ltd</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="170"
                  width="170"
                  image="https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <CardContent>
                  <Typography>Peter Tan Pte Ltd</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
