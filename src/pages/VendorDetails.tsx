import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Icon,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box, width } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CalendarMonth } from "@mui/icons-material";
import axios from "axios";
import { IPortfolio2, IVendor } from "../Interface";
import urlcat from "urlcat";
import { compareDesc, format, formatDistance, subDays } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import HeatMap from "@uiw/react-heat-map";

const VendorDetails: FC = () => {
  const [selected, setSelected] = useState("");
  const [count, setCount] = useState(999);
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
  const [portfolios, setPortfolios] = useState<IPortfolio2[]>([]);
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
            console.log(res.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const navigatePortfolioDetails = (e: any) => {
    navigate(`/${e.target.name}/${e.target.id}`);
  };

  function countDuplicates(
    arr: any[]
  ): { date: any; count: number; content: string }[] {
    // Create an empty object to store the counts of each element
    const counts: { [key: string]: number } = {};

    // Iterate through the input array and count the occurrences of each element
    for (const element of arr) {
      counts[element] ? counts[element]++ : (counts[element] = 1);
    }

    // Convert the counts object into an array of objects with the format { date: element, count: count }
    const result: { date: any; count: number; content: string }[] = [];
    for (const element in counts) {
      result.push({ date: element, count: counts[element], content: "" });
    }

    // Return the result array
    return result;
  }

  const value = countDuplicates(
    portfolios.map((e) => format(new Date(e.createdAt), "yyyy/MM/dd"))
  );

  const mostToLeastRecentContribution = portfolios
    .map((e) => new Date(e?.createdAt))
    .sort(compareDesc);

  const today = new Date();

  const [currentSelection, setCurrentSelection] = useState("All");
  const selectList = [
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

  const filteredDesigns =
    currentSelection === "All"
      ? portfolios
      : portfolios.filter(
          (portfolio) => portfolio.designTheme === currentSelection
        );

  const filteredDesignThemes = selectList.filter(
    (item) =>
      item === portfolios?.find((ele) => ele.designTheme === item)?.designTheme
  );

  const handleChange = (event: any) => {
    setCurrentSelection(event.target.value);
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
            <Box>
              Last Active:{" "}
              {mostToLeastRecentContribution[0] === undefined
                ? "Loading..."
                : formatDistance(mostToLeastRecentContribution[0], new Date(), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
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
            <Typography sx={{ fontSize: 16 }}>{vendor.brandSummary}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: "3rem", mx: "3rem" }}>
          <Box
            sx={{
              px: 3,
              borderBottom: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 36,
                fontWeight: 800,
              }}
            >
              Overview
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                gap: 2,
              }}
            >
              <Typography sx={{ fontSize: "medium", fontWeight: 500 }}>
                {selected === ""
                  ? ""
                  : `Date: ${format(new Date(selected), "dd MMM yyyy")}`}
              </Typography>
              <Typography sx={{ fontSize: "medium", fontWeight: 500 }}>
                {count === 999 ? "" : `Count: ${count}`}
              </Typography>
              <Typography sx={{ fontSize: "medium", fontWeight: 500 }}>
                Total Portfolios Created: {portfolios.length}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: "1rem", mx: "2rem" }}>
            <HeatMap
              value={value}
              width={"100%"}
              height={210}
              rectSize={20}
              startDate={subDays(today, 365)}
              endDate={today}
              legendCellSize={0}
              rectProps={{
                rx: 3,
              }}
              panelColors={{
                1: "#EBEDF0",
                2: "#7BC96F",
                3: "#C6E48B",
                4: "#239A3B",
                5: "#196127",
              }}
              rectRender={(props, data) => {
                return (
                  <rect
                    onMouseLeave={() => {
                      setSelected("");
                      setCount(999);
                    }}
                    {...props}
                    onMouseOver={() => {
                      setCount(data.count === undefined ? 0 : data.count);
                      setSelected(data.date);
                    }}
                  />
                );
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: "1.5rem" }}>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: "2rem",
              mx: "5rem",
            }}
          >
            <Typography variant="h5" sx={{ mr: 2 }}>
              Select Design:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 250 }}>
              <Select
                value={currentSelection}
                onChange={handleChange}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                {filteredDesignThemes.sort().map((design, idx) => (
                  <MenuItem key={idx} value={design}>
                    {design}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mx: "5rem", mt: "2rem" }}>
            <Grid container spacing={6}>
              {filteredDesigns[0] ? (
                filteredDesigns?.map((portfolio) => {
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
                })
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    height: "full",
                    p: 10,
                    mx: "auto",
                  }}
                >
                  <CircularProgress />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "medium",
                    }}
                  >
                    Loading might take awhile...
                  </Typography>
                </Box>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default VendorDetails;
