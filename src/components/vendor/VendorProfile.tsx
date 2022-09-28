import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CardContent,
} from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import urlcat from "urlcat";
import { IVendor } from "../../Interface";
import CardActions from "@mui/material/CardActions";
import { IPortfolio } from "../../Interface";

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

const SERVER = import.meta.env.VITE_SERVER;

const VendorProfile: FC = () => {
  const token: any = sessionStorage.getItem("token");
  const { vendorid } = useParams();
  const [offEditMode, setOffEditMode] = useState(true);
  const navigate = useNavigate();
  const [value, setValue] = React.useState("");
  const [portfolio, setPortfolio] = useState([]);

  const [vendorAccount, setVendorAccount] = useState<IVendor>({
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
  });

  useEffect(() => {
    //get portfolios
    const portfolioUrl = urlcat(SERVER, `/portfolios/findById/${vendorid}`);
    axios
      .get(portfolioUrl)
      .then((res) => {
        setPortfolio(res.data);
      })
      .catch((err) => console.log(err));
  }, [offEditMode]);

  const handleEdit = () => {
    if (offEditMode) {
      setOffEditMode(!offEditMode);
    } else {
      alert("Your Brand Story has been updated!");
      setOffEditMode(!offEditMode);
      const url = urlcat(SERVER, `/vendors/id/${vendorid}`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const body = { ...vendorAccount, brandSummary: value };
      console.log(body);
      axios
        .put(url, body, config)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleformPortfolio = () => {
    navigate(`/vendor/${vendorid}/portfolio-form`);
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
              <Typography variant="h3">Brand Story</Typography>
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
              <Button sx={projectButtonSx} onClick={handleEdit}>
                {offEditMode ? "Edit" : "Submit Changes"}
              </Button>
              {!offEditMode && (
                <Button
                  sx={projectButtonSx}
                  onClick={() => {
                    setVendorAccount({
                      ...vendorAccount,
                      username: "rerender initial state",
                    });
                    setOffEditMode(!offEditMode);
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={offEditMode}
            sx={{ mb: "0.5rem", color: "#444444", width: "100%" }}
            multiline
            rows={10}
            placeholder="Please input your brand story here!"
            value={value}
            onChange={handleChange}
          />
        </Grid>

        <Grid
          container
          sx={{
            mt: "2rem",
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Typography variant="h3">Portfolios</Typography>
          <Button sx={projectButtonSx} onClick={handleformPortfolio}>
            <AddIcon />
            Portfolio
          </Button>

          <Grid container sx={{ mt: "1rem" }}>
            <Divider sx={style} />
          </Grid>
        </Grid>
        <Grid container sx={{ mt: "1rem", display: "flex" }} spacing={2}>
          {portfolio?.map((item: any, index) => {
            return (
              <Grid item sm={12} md={3} key={index} sx={{ padding: 0 }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="170"
                    image={item?.images[0]}
                  />
                  <CardContent sx={{ pt: 1, pl: 1, pr: 0, pb: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "medium",
                      }}
                    >
                      {item?.designTheme}
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
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default VendorProfile;
