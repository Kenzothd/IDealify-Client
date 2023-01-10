import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { string } from "yup";
import { IHomeCarouselItems } from "../../Interface";

const HomeCarousel = () => {
  var items = [
    {
      id: 1,
      name: "All interior designs in one place",
      image:
        "https://images.pexels.com/photos/921294/pexels-photo-921294.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description:
        "Choose your favourite design and find the ID the best suits you!",
      color: "pink",
    },
    {
      id: 2,
      name: "Focus on the styles with no worries ",
      image:
        "https://images.pexels.com/photos/1144871/pexels-photo-1144871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "A pool of credible IDs ready to serve your needs",
      color: "grey",
    },
    {
      id: 3,
      name: "Manage and Connect on IDealify",
      image:
        "https://images.pexels.com/photos/7897470/pexels-photo-7897470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description:
        "Manage your projects with your Interior Designer in one place",
      color: "pink",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

type Props = {
  item: IHomeCarouselItems;
};

function Item({ item }: Props) {
  return (
    <Box>
      <img
        style={{ width: "100%", height: "40vh", objectFit: "fill" }}
        src={item.image}
      />
      {item.id === 1 ? (
        <Typography
          sx={{
            position: "absolute",
            top: "65%",
            right: "55%",
            fontWeight: "bold",
          }}
          variant="h3"
        >
          {item.name}
        </Typography>
      ) : item.id === 2 ? (
        <Typography
          sx={{
            position: "absolute",
            top: "55%",
            right: "8%",
            color: "white",
            fontWeight: "bold",
          }}
          variant="h3"
        >
          {item.name}
        </Typography>
      ) : (
        <Typography
          sx={{
            position: "absolute",
            top: "20%",
            right: "28%",
            color: "white",
            fontWeight: "bold",
            fontSize: "30px",
          }}
          //   variant="h3"
        >
          {item.name}
        </Typography>
      )}
    </Box>
    // <Container sx={{ background: item.color, pt: 12, pb: 12 }}>
    //   <Typography variant="h3" sx={{ pl: 5, fontWeight: "600" }}>
    //     {item.name}
    //   </Typography>
    //   <Typography variant="h5" sx={{ pl: 5, mt: 2, fontWeight: "400" }}>
    //     {item.description}
    //   </Typography>
    // </Container>
  );
}

export default HomeCarousel;
