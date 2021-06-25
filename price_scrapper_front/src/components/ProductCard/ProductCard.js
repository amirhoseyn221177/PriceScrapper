import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { withRouter,} from 'react-router';
import {Link } from "react-router-dom";
import './ProductCard.css'

const ProductCard = (props) => {

    var goingToDetail = () => {
        props.history.push({
            pathname: '/productDetail',
            search: `cardTitle=${props.cardTitle}&vendor=${props.vendor}&price=${props.price}&currency=${props.currency}&image=${props.image}&itemURL=${props.itemURL}`
        });
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} width="100" height="180" />
            <Card.Body className="cardBody">
                <Card.Title>{props.cardTitle}</Card.Title>
                <Card.Text>
                    Best price at {props.vendor} for {props.price} {props.currency}
                </Card.Text>
                {/* <Link to="/productDetail">
                <Button variant="contained" color="primary">
                    Details
                </Button>
                </Link> */}
                <Button variant="contained" color="primary" onClick={goingToDetail}>
                    Details
                </Button>
            </Card.Body>
        </Card>
    )
}

export default withRouter (ProductCard);