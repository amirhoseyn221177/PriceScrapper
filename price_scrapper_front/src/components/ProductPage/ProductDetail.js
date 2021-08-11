import React, { useEffect, useState } from "react";
import { Card } from 'react-bootstrap'
import { withRouter } from 'react-router';
import { Button, TextareaAutosize } from '@material-ui/core';
import './ProductDetail.css'
import SuggestedItems from '../SuggestedItems/SuggestedItems';
import { connect } from 'react-redux';
import axios from 'axios'
import StarRating from "./StarRating";
import qs from 'qs'
import { get } from "mongoose";
import { red } from "@material-ui/core/colors";

const ProductDetail = (props) => {
    const [index, setIndex] = useState(parseInt(props.match.params.index, 10));
    const [itemFromPath, setItemFromPath] = useState({})
    const [productInfoFromPath, setProductsFromPath] = useState([])
    var setProductIndex = (index) => {
        setIndex(index);
    }
    const [listReview, setListReview] = useState([]);
    var [rev, setReview] = useState("");
    const [loadedReview, setLoadedReview] = useState([]);

    useEffect(() => {
        let base64 = props.match.params.item64
        let product64 = qs.parse(props.location.search)["?base64product"]
        console.log(product64)
        let jsonItem = atob(base64)
        setItemFromPath(JSON.parse(jsonItem))
        if (product64 !== undefined) setProductsFromPath(JSON.parse(decodeURIComponent(product64)))
    }, [props.match.params.item64])

    function averagePrice() {
        var sum = 0;
        for (let i = 0; i < productInfoFromPath.length; i++) {
            sum = sum + parseInt(productInfoFromPath[i].price, 10);
        }
        return (sum / (productInfoFromPath.length + 1)).toFixed(2)

    }

    async function addReview() {
        try {
            let token = localStorage.getItem("token");
            const resp = await axios.get('/api/user/userinfo', {
                headers: {
                    "Authorization": token
                }
            })
            const data = await resp.data
            var FirstName = data.Name;
        } catch (e) {
            console.log(e.message)
        }
        let token = localStorage.getItem("token");
        var itemURL = itemFromPath.itemURL;
        var title = itemFromPath.title;
        // var FirstName = itemFromPath.FirstName;
        var LastName = itemFromPath.LastName;
        var review = rev;
        var newReview = {
            itemURL,
            title,
            FirstName,
            LastName,
            review
        };
        const data = await (await axios.post('/api/items/getReviews', newReview, {
            headers: {
                "Authorization": token
            }
        })).data;
    }

    async function getReview() {
        const result = {};
        try {
            let token = localStorage.getItem("token");
            const resp = await axios.get('/api/items/getReviews', {
                headers: {
                    "Authorization": token
                }
            })
            const data = await resp.data
            if (data.length > 0) {
                data.map(item => {
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

    useEffect(() => {
        getReview()
    }, [itemFromPath])

    function addToWishlist() {
        let token = localStorage.getItem("token")
        delete itemFromPath["_id"]
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

    console.log(listReview)
    return (
        <div className="cardInfo">
            <div className="cardContents">
                <Card style={{ height: '500px' }} id="cardDetail">
                    <div class="row">
                        <div class="column">
                            <Card.Img style={{ paddingTop: '33%' }} variant="top" src={itemFromPath.image} width='300' height='200' />
                            <br />
                            <br />
                            <Card.Title className="cardDetailsTitle">{itemFromPath.title}</Card.Title>
                        </div>
                        <div class="column">
                            <Card.Body className="cardDetailsBody">
                                <Card.Text>
                                    <p>
                                        Vendor: {itemFromPath.vendor}
                                    </p>
                                    <p>
                                        Price: {itemFromPath.price} {itemFromPath.currency}
                                    </p>
                                    <p>
                                        <StarRating />
                                    </p>
                                    <p>
                                        Average Price: {averagePrice()}
                                    </p>
                                    <br />
                                    <br />
                                    <a href={itemFromPath.itemURL}>
                                        <Button id="buyBtn" variant="contained" color="primary">
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
                                </Card.Text>
                            </Card.Body>
                        </div>
                        {
                            localStorage.getItem("token") ?
                                <div className="column">
                                    <div id="reviews">
                                        <h3>Reviews</h3>
                                        <div id="reviewList">
                                            {
                                                listReview.length !== 0 ?
                                                    <p>{listReview.map(item => (
                                                        <p> {item.FirstName} : {item.review}</p>))}
                                                    </p> : <p id="emptyText"> No reviews available yet, write one!</p>
                                            }
                                        </div>
                                        <br />
                                        <br />
                                        <TextareaAutosize data-role="none" style={{resize: "none", overflow: "scroll"}} id="textArea" rows={4} maxRows={4} placeholder="Write a review" onChange={e => setReview(e.target.value)}></TextareaAutosize>
                                        <br />
                                        <br />
                                        <br />
                                        <Button variant="contained" color="primary" onClick={() => addReview()}>Submit Review</Button>
                                    </div>
                                </div> : null
                        }
                    </div>
                </Card>
            </div>
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



