import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Button, Typography } from '@mui/material'
import { Container } from '@mui/system';
import { string } from 'yup';
import { IHomeCarouselItems } from '../../Interface';




const HomeCarousel = () => {

    var items = [
        {
            name: "All the interior designs in one place",
            description: "Choose your favourite design and find the ID the best suits you!",
            color: 'pink'
        },
        {
            name: "Focus on the styles with no worries ",
            description: "A pool of credible IDs ready to serve your needs",
            color: 'grey'
        }
    ]

    return (
        <Carousel >
            {
                items.map((item, i) =>
                    <Item key={i} item={item} />
                )
            }
        </Carousel>
    )
}

type Props = {
    item: IHomeCarouselItems
}

function Item({ item }: Props) {
    return (
        <Container sx={{ background: item.color, pt: 12, pb: 12 }}>
            <Typography variant="h3" sx={{ pl: 5, fontWeight: "600" }}>{item.name}</Typography>
            <Typography variant="h5" sx={{ pl: 5, mt: 2, fontWeight: "400" }}>{item.description}</Typography>


        </Container>
    )
}

export default HomeCarousel