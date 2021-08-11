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

const ProductDetail = (props) => {
    console.log(13)
    const [index, setIndex] = useState(parseInt(props.match.params.index,10));
    const [itemFromPath,setItemFromPath]=useState({})
    const [productInfoFromPath,setProductsFromPath]=useState([])
    var setProductIndex = (index) => {
        setIndex(index);
    }
    var [review, setReview] = useState("");
    const [loadedReview, changeLoadedReview] = useState([]);

    console.log(productInfoFromPath)

    useEffect(()=>{
        let base64  = props.match.params.item64
        let product64 =qs.parse(props.location.search)["?base64product"]
        let jsonItem = atob(base64)
        setItemFromPath(JSON.parse(jsonItem))
        changeLoadedReview()
        // if(product64 !== undefined)setProductsFromPath(JSON.parse(atob(product64)))
    },[ props.match.params.item64])

    console.log(itemFromPath)

    function averagePrice() {
        var sum = 0;
        for(let i = 0; i < productInfoFromPath.length; i++) {
            sum = sum + parseInt(productInfoFromPath[i].price,10);
        }
        return (sum / (productInfoFromPath.length + 1)).toFixed(2)

    }

    async function addReview() {
        var itemURL = itemFromPath.itemURL;
        var title = itemFromPath.title;
        var FirstName = itemFromPath.FirstName;
        var LastName = itemFromPath.LastName;
        var review = review;
        var newReview = {
            itemURL,
            title,
            FirstName,
            LastName,
            review
        };    
        console.log(newReview);
        const data = await (await axios.post('/api/items/getReviews', newReview)).data;
      }

      async function getReview() {
        axios.get("http://localhost:8080/getReviews")
        .then(response => {
            console.log(response.data)
            changeLoadedReview(response.data)
        }).catch(e=>{
            console.log(e)
        })
      }

    function addToWishlist() {
        let token = localStorage.getItem("token")
        delete itemFromPath["_id"]
        console.log(itemFromPath)
        axios.post('/api/items/addToWishList',  {item:itemFromPath},{
            headers:{
                "Authorization":token
            }
        })
            .then(response => console.log(response.data));
    }

    useEffect(() => {
        if (props.item.title === "" && itemFromPath === null) props.history.push("/")
        else{

        }
    },[])

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
                <StarRating />
            </p>
            <p>
                Description:
            </p>
            <p>
                Reviews:
            </p>
            <input id="review" type="text" placeholder="review" onChange={e => setReview(e.target.value)} />
            <br />
            <br />
            <input type="button" value="Submit" onClick={() => addReview()} />
            <p>
                Average Price: {averagePrice()}
            </p>
            <p>
                {/* {getReview()} */}
            </p>
            <a href={itemFromPath.itemURL}>
                <Button variant="contained" color="primary">
                    Buy product!
                </Button>
            </a>
            <br />
            <br />
            {
                localStorage.getItem("token") ?
                    <Button variant="contained" color="primary" onClick={() => {addToWishlist()}}>
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



