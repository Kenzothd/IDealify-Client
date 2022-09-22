import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
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
  });
  const [value, setValue] = React.useState("");
  const [offEditMode, setOffEditMode] = useState(true);
  const token: any = sessionStorage.getItem("token");
  const { vendorid } = useParams();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    //get vendor account details
    const vendorURL = urlcat(SERVER, `/vendors/id/${vendorid}`);
    axios
      .get(vendorURL, config)
      .then((res) => {
        setVendorAccount(res.data);
        setValue(res.data.brandSummary);
        console.log(res.data);
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
        <Grid container sx={{ mt: "1rem", display: "flex" }} spacing={2}>
          {vendorAccount.uploadedFiles.map((img) => {
            return (
              <Grid item sm={12} md={3}>
                <Card>
                  <CardMedia component="img" height="170" image={img} />
                </Card>
              </Grid>
            );
          })}
          {/* <Grid item sm={12} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="170"
                image="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
              />
            </Card>
          </Grid> */}
          {/* <Grid item sm={12} md={3}>
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
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

export default VendorProfile;
