import React from 'react'
import { Card } from 'react-bootstrap'
import { Button, Tooltip} from '@material-ui/core';
import { withRouter, } from 'react-router';
import './ProductCard.css'

const ProductCard = (props) => {



    return (
        <Card className="productCard">
            <Card.Img className="cardImg" variant="top" src={props.image} width="100" height="180" />
            <Card.Body className="cardBody">
                <div className="titleDiv">
                    <Tooltip title={props.cardTitle} arrow>
                        <Card.Title className="cardTitle">{props.cardTitle}</Card.Title>
                    </Tooltip>
                </div>
                <Card.Text>
                    Best price at {props.vendor} for {props.price} {props.currency}
                </Card.Text>
                <Button variant="contained" color="primary" onClick={props.onClick}>
                    Details
                </Button>
            </Card.Body>
        </Card>
    )
}

export default withRouter(ProductCard);