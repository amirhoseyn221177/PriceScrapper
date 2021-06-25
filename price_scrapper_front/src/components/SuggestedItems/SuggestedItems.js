import React from 'react';
import Carousel from 'react-multi-carousel';
import './SuggestedItems.css';
import 'react-multi-carousel/lib/styles.css';
import {
    Card,
    CardContent,
    CardMedia,
    Typography
} from "@material-ui/core";

const SuggestedItems = () => {
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
        },
        {
            image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1611947186-nmd-r1-athletic-shoe-adidas-1611947175.jpg",
            name: "Product4",
            price: "$4"
        },
        {
            image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1611947186-nmd-r1-athletic-shoe-adidas-1611947175.jpg",
            name: "Product5",
            price: "$5"
        },
        {
            image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1611947186-nmd-r1-athletic-shoe-adidas-1611947175.jpg",
            name: "Product6",
            price: "$6"
        }
    ]

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div className="carouselDiv">
            <h2>Items you might like:</h2>
            <Carousel
                responsive={responsive}
                autoPlay={false}
                autoPlaySpeed={5000}
                showDots={true}
                ssr={true}
                infinite={true}
                deviceType={"desktop"}
                customTransition="all .5"
                transitionDuration={500}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
            >
                {
                    items.map((item, idx) => {
                        return (
                            <Card
                                key={idx}
                                style={{
                                    width: 200
                                }}
                            >
                                <CardMedia
                                    image={item.image}
                                    title={item.name}
                                    style={{
                                        height: 100,
                                        width: 200,
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
                }
            </Carousel>
        </div>
    );
}

export default SuggestedItems
