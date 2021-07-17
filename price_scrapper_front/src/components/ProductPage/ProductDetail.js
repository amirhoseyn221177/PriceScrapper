import React, { useEffect, useState } from "react";
import { Card  } from 'react-bootstrap'
import { withRouter} from 'react-router';
import { Button } from '@material-ui/core';
import './ProductDetail.css'
import SuggestedItems from '../SuggestedItems/SuggestedItems';
import { connect } from 'react-redux';
import axios from 'axios'


const ProductDetail = (props) => {
    console.log(props)
    const [index, setIndex] = useState(props.location.state.index);
    console.log(index)
    var setProductIndex = (index)=> {
        setIndex(index);
    }
    // var goToProductPage = () => {
    //     let item = props.location.state[index];
    //     // props.sendingItemArray(item);
    //     props.history.push({
    //         pathname: '/productdetail',
    //         state: props.location.state
    //     });
    // };

    console.log(props.item)

    function addToWishlist(item) {
        axios.post('/api/addToWishlist/', item)
                .then(response => console.log(response.data));
    }

    useEffect(()=>{
        if(props.item.title==="") props.history.push("/")
    })
    return (
        <div>
            <Card style={{ width: '40rem', height: '30rem', position: 'relative', left: '31.5%', marginTop: '5%'}}>
                <Card.Img variant="top" src={props.location.state.productInfoArray[index].image} width= '640' height= '480'/>
                <Card.Body className="cardBody">
                </Card.Body>
            </Card>
            <p >
                Name: {props.location.state.productInfoArray[index].title}
            </p>
            <p>
                Vendor: {props.location.state.productInfoArray[index].vendor}
            </p>
            <p>
                Price: {props.location.state.productInfoArray[index].price} {props.location.state.productInfoArray[index].currency}
            </p>
            <p>
                Rating: 
            </p>
            <p>
                Description:
            </p>
            <p>
                Reviews:
            </p>
            <a href={props.item.itemURL}>
            <Button  variant="contained" color="primary">
                    Buy product!
                </Button>
            </a>
            <br/>
            <br/>
            <Button variant="contained" color="primary" onClick={addToWishlist(props.item)}>
                    Add to wishlist
            </Button>
           <SuggestedItems />
           <SuggestedItems 
                allItems = {props.location.state.productInfoArray} setProductIndex = {setProductIndex}
           />
        </div>
    )
}


const mapToState= state=>{
    return{
        item:state.item,
    }
}
// const mapToProps = dispatch => {
//     return {
//         sendingItemArray: (item) => dispatch(ChosenItem(item))
//     };
// };

export default connect(mapToState,null) (withRouter(ProductDetail));
