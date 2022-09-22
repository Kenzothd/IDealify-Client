import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

const style = {
  width: "100%",
  bgcolor: "#444444",
};

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
const VendorProfile: FC = () => {
  const [value, setValue] = React.useState(
    "Goddard Littlefair is a London-based, luxury interior design studio, established in 2012 by Martin Goddard and Jo Littlefair. The company’s talented, international team works on multi-award-winning hotel, hospitality and spa projects across the globe, as well as high-end residential schemes."
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mb: "5rem",
          pr: "2rem",
          pl: "2rem",
        }}
      >
        <Grid container sx={{ mb: "1rem" }}>
          <Grid item xs={12} sm={7}>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Typography variant="h3">Goddard Littlefair</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: { sm: "right" },
                gap: "1rem",
              }}
            >
              <Button sx={projectButtonSx}>To Edit</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ mb: "0.5rem", color: "#444444", width: "100%" }}
            multiline
            rows={10}
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid container sx={{ mt: "2rem" }}>
          <Grid item xs={12} sm={7}>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Typography variant="h3">Photos</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: { sm: "right" },
                gap: "1rem",
              }}
            >
              <Button sx={projectButtonSx}>
                <AddIcon sx={{ paddingRight: "10px" }} />
                Photos
              </Button>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: "1rem" }}>
            <Divider sx={style} />
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
                image="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
              />
            </Card>
          </Grid>
          <Grid item sm={12} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="170"
                image="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1600"
              />
            </Card>
          </Grid>
          <Grid item sm={12} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="170"
                image="https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1600"
              />
            </Card>
          </Grid>
          <Grid item sm={12} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="170"
                image="https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1600"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default VendorProfile;
