import React from 'react';
import { Card } from 'react-bootstrap'
import { withRouter } from 'react-router';
import { Button } from '@material-ui/core';
import './ProductDetail.css'

const ProductDetail = () => {
    return (
        <div>
            <Card style={{ width: '40rem', height: '30rem' }} className="center">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body className="cardBody">
                </Card.Body>
            </Card>
            <p >
                Name:
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
            <Button variant="contained" color="primary">
                    Buy product!
                </Button>
        </div>
    )
}

export default withRouter(ProductDetail);