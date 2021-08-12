import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import './SuggestedItems.css';
import 'react-multi-carousel/lib/styles.css';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip
} from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { ChosenItem, similarItems } from '../Actions/actions';
import { connect } from 'react-redux';
import axios from 'axios';

const SuggestedItems = (props) => {
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState(props.searchtext);
    useEffect(() => {
        setItems(props.allItems);
    }, [props.allItems]);

    function addToRecentlyViewed(item) {
        let token = localStorage.getItem("token");
        if (token === "" || token === null || token === undefined) return;
        axios.post('/api/items/addToRecent', { item }, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => console.log());
    }



    var goToProductPage = (item, index) => {
        props.sendingItemArray(item);
        addToRecentlyViewed(item);
        props.sendingItems(items);
        let base64Item = JSON.stringify(item);
        base64Item = Buffer.from(base64Item).toString("base64");
        props.history.push({
            pathname: `/productdetail/${base64Item}/${index}`,
            serach: `?searchedWord = ${searchText}`
        });
    };

    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 4
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 2
        }
    };
    return (
        <div
            style={{
                paddingBottom: '80px',
                position: 'relative',
                zIndex: 0
            }}
        >
            <h2 className="h2Title">Other items you might like:</h2>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={5000}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false} setProductIndex
                responsive={responsive}
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {
                    items.map((item, idx) => {
                        return (
                            <Card
                                id="suggestedCard"
                                key={idx}
                                style={{
                                    width: 200
                                }}
                            >
                                <CardMedia
                                    onClick={() => goToProductPage(item, idx)}
                                    image={item.image}
                                    title={item.title}
                                    style={{
                                        height: 100,
                                        width: 200,
                                        paddingTop: '25%',
                                    }}
                                />
                                <CardContent>
                                    <Tooltip title={item.title} placement="left" arrow>
                                        <Typography className="itemName">{item.title}</Typography>
                                    </Tooltip>
                                    <Typography>{item.price}</Typography>
                                </CardContent>
                            </Card>
                        );
                    })
                }
            </Carousel>
        </div >
    );
};



const mapToProps = dispatch => {
    return {
        sendingItemArray: (item) => dispatch(ChosenItem(item)),
        sendingItems: (items) => dispatch(similarItems(items))
    };
};
export default connect(null, mapToProps)(withRouter(SuggestedItems));
