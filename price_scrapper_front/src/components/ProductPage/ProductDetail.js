import React, { useEffect, useState } from "react";
import { Card } from 'react-bootstrap'
import { withRouter } from 'react-router';
import { Button } from '@material-ui/core';
import './ProductDetail.css'
import SuggestedItems from '../SuggestedItems/SuggestedItems';
import { connect } from 'react-redux';
import axios from 'axios'
import StarRating from "./StarRating";
import qs from 'qs'
import { get } from "mongoose";
import { red } from "@material-ui/core/colors";

const ProductDetail = (props) => {
    console.log(13)
    const [index, setIndex] = useState(parseInt(props.match.params.index, 10));
    const [itemFromPath, setItemFromPath] = useState({})
    const [productInfoFromPath, setProductsFromPath] = useState([])
    var setProductIndex = (index) => {
        setIndex(index);
    }
    const [listReview, setListReview] = useState([]);
    var [rev, setReview] = useState("");
    var [ratings, setRatings] = useState("");
    const [loadedReview, setLoadedReview] = useState([]);
    const [loadedRating, setLoadedRating] = useState();


    console.log(productInfoFromPath)

    useEffect(() => {
        let base64 = props.match.params.item64
        let product64 = qs.parse(props.location.search)["?base64product"]
        console.log(product64)
        let jsonItem = atob(base64)
        setItemFromPath(JSON.parse(jsonItem))
        if (product64 !== undefined) setProductsFromPath(JSON.parse(decodeURIComponent(product64)))
    }, [props.match.params.item64])

    console.log(itemFromPath)

    function averagePrice() {
        var sum = 0;
        for (let i = 0; i < productInfoFromPath.length; i++) {
            sum = sum + parseInt(productInfoFromPath[i].price, 10);
        }
        return (sum / (productInfoFromPath.length + 1)).toFixed(2)

    }

    async function addReview() {
        console.log("hi")
        try {
            let token = localStorage.getItem("token");
            const resp = await axios.get('/api/user/userinfo', {
                headers: {
                    "Authorization": token
                }
            })
            const data = await resp.data
            console.log(data)
            var FirstName = data.Name;
            console.log(FirstName)
        } catch (e) {
            console.log(e.message)
        }
        let token = localStorage.getItem("token");
        var itemURL = itemFromPath.itemURL;
        var title = itemFromPath.title;
        // var FirstName = itemFromPath.FirstName;
        var LastName = itemFromPath.LastName;
        var review = rev;
        console.log(review);
        var newReview = {
            itemURL,
            title,
            FirstName,
            LastName,
            review
        };
        console.log(newReview);
        const data = await (await axios.post('/api/items/getReviews', newReview, {
            headers: {
                "Authorization": token
            }
        })).data;
    }

    async function addRating() {
        console.log("87")
        try {
            let token = localStorage.getItem("token");
            const resp = await axios.get('/api/user/userinfo', {
                headers: {
                    "Authorization": token
                }
            })
            const data = await resp.data
            console.log(data)
            var FirstName = data.Name;
         
        var itemURL = itemFromPath.itemURL;
        var title = itemFromPath.title;
        var rating = ratings;
        console.log(rating);
        var newRating = {
            itemURL,
            title,
            FirstName,
            rating
        };
        console.log(newRating);
        const dataRating = await (await axios.post('/api/items/getRating', newRating, {
            headers: {
                "Authorization": token
            }
        })).data;
            console.log(FirstName)
        } catch (e) {
            console.log(e.message)
        }
        
    }

    

    async function getReview() {
        try {
            let token = localStorage.getItem("token");
            const resp = await axios.get('/api/items/getReviews', {
                headers: {
                    "Authorization": token
                }
            })
            const data = await resp.data
            console.log(data)
            if (data.length > 0) {
                data.map(item => {
                    console.log(itemFromPath.itemURL)
                    console.log(item.itemURL)
                    if (item.itemURL === itemFromPath.itemURL) {
                        setListReview(prev => [...prev, item])
                    }
                })
                setLoadedReview(data)
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    async function getRating() {
        try {
            let token = localStorage.getItem("token");
            const resp = await axios.get('/api/items/getRating/' + itemFromPath.itemURL, {
                headers: {
                    "Authorization": token
                }
            })
            const data = await resp.data
            console.log(data)
                setLoadedRating(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    console.log(itemFromPath.itemURL)

    useEffect(() => {
        getReview()
        getRating()
    }, [itemFromPath])

    console.log(loadedReview)


    function addToWishlist() {
        let token = localStorage.getItem("token")
        delete itemFromPath["_id"]
        console.log(itemFromPath)
        axios.post('/api/items/addToWishList', { item: itemFromPath }, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => console.log(response.data));
    }

    useEffect(() => {
        if (props.item.title === "" && itemFromPath === null) props.history.push("/")
        else {

        }
    }, [])

    console.log(index)
    return (
        <div className="cardInfo">
            <Card id="cardDetail">
                <Card.Img variant="top" src={itemFromPath.image} width='640' height='480' />
                <Card.Body className="cardBody">
                </Card.Body>
            </Card>
            <p >
                Name: {itemFromPath.title}
            </p>
            <p>
                Vendor: {itemFromPath.vendor}
            </p>
            <p>
                Price: {itemFromPath.price} {itemFromPath.currency}
            </p>
            <p>
                Average Price: {averagePrice()}
            </p>
            {
                localStorage.getItem("token") ?
                    <div>
                        <p>
                            <StarRating ratingValue={itemFromPath.rating} addRating={e => addRating(itemFromPath.rating)} />
                        </p>
                        <p style={{ color: "red" }}>
                            Reviews: {listReview.map(item => (
                                <p color> {item.FirstName} : {item.review}</p>
                            ))}
                        </p>
                        <input id="review" type="text" placeholder="Write A Review" size="50" onChange={e => setReview(e.target.value)} />
                        {/* <input type="button" value="Submit Review" onClick={() => addReview()} /> */}
                        <br />
                        <br />
                        <Button variant="contained" color="primary" onClick={() => addReview()}>
                            Submit Review
                        </Button>
                    </div> : null
            }
            <br />
            <a href={itemFromPath.itemURL}>
                <Button variant="contained" color="primary">
                    Buy product!
                </Button>
            </a>
            <br />
            <br />
            {
                localStorage.getItem("token") ?
                    <Button variant="contained" color="primary" onClick={() => { addToWishlist() }}>
                        Add to wishlist
                    </Button> : null
            }
            <SuggestedItems
                allItems={productInfoFromPath} setProductIndex={setProductIndex}
            />
        </div>
    )
}


const mapToState = state => {
    return {
        item: state.item,
    }
}

export default connect(mapToState, null)(withRouter(ProductDetail));



