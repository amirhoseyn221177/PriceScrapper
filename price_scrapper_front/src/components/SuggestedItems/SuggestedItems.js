import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Card,
    CardContent,
    CardMedia,
    Typography
} from "@material-ui/core";
import './SuggestedItems.css';

const SuggestedItems = () => {
    useEffect(() => {
        createItemRow()
    }, [])

    var row = []
    var items = [
        {
            image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1611947186-nmd-r1-athletic-shoe-adidas-1611947175.jpg",
            name: "Product1",
            price: "$1"
        },
        {
            image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1611947186-nmd-r1-athletic-shoe-adidas-1611947175.jpg",
            name: "Product2",
            price: "$2"
        },
        {
            image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1611947186-nmd-r1-athletic-shoe-adidas-1611947175.jpg",
            name: "Product3",
            price: "$3"
        }
    ]

    function createItemRow() {
        items.forEach((item) => {
            row.push(
                <Card
                style={{
                    width: 100
                }}
                >
                    <CardMedia
                        image={item.image}
                        title={item.name}
                        style={{
                            height: 100,
                            width: 100,
                            paddingTop: '25%',
                        }}
                    />
                    <CardContent>
                        <Typography>{item.name}</Typography>
                        <Typography>{item.price}</Typography>
                    </CardContent>
                </Card>
            )
        })
        console.log(row)
    }

    return (
        <Carousel
            autoPlay={true}
            stopAutoPlayOnHover={true}
            navButtonsAlwaysVisible={true}
            animation="slider"
            indicators={true}

        >
            {row}
        </Carousel>
    )
}

export default SuggestedItems
