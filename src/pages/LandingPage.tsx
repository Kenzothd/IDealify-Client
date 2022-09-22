import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#F1C88A" : "#F1C88A",
  ...theme.typography.body2,
  padding: "8px 20px",
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
}));

function DirectionStack() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>All</Item>
        <Item>Trending</Item>
        <Item>Scandivian</Item>
        <Item>Minimalist</Item>
        <Item>Modern</Item>
      </Stack>
    </Box>
  );
}

const LandingPage: FC = () => {
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography>Landing page</Typography>

        <DirectionStack />
        <Box>
          <Grid container>
            <Grid item md={3}>
              1
            </Grid>
            <Grid item md={3}>
              2
            </Grid>
            <Grid item md={3}>
              3
            </Grid>
            <Grid item md={3}>
              4
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={3}>
              1
            </Grid>
            <Grid item md={3}>
              2
            </Grid>
            <Grid item md={3}>
              3
            </Grid>
            <Grid item md={3}>
              4
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
