import React, {useState}from 'react';
import { Card  } from 'react-bootstrap'
import { withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import { Button } from '@material-ui/core';
import './ProductDetail.css'
import qs from 'qs'
import { connect } from 'react-redux';

const ProductDetail = (props) => {

   var goToBuy=()=>{
       props.history.push(props.item.itemURL)
   }
    return (
        <div>
            <Card style={{ width: '40rem', height: '30rem', position: 'relative', left: '31.5%', marginTop: '5%'}}>
                <Card.Img variant="top" src={props.item.image} width= '640' height= '480'/>
                <Card.Body className="cardBody">
                </Card.Body>
            </Card>
            <p >
                Name: {props.item.title}
            </p>
            <p>
                Vendor: {props.item.vendor}
            </p>
            <p>
                Price: {props.item.price} {props.item.currency}
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
           
        </div>
    )
}


const mapToState= state=>{
    return{
        item:state.item
    }
}

export default connect(mapToState,null) (withRouter(ProductDetail));
