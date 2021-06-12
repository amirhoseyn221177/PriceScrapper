import React from 'react';
import { Card } from 'react-bootstrap'
import { withRouter } from 'react-router';
import './ProductDetail.css'

const ProductDetail = () => {
    return (
        <div>
            <Card style={{ width: '40rem', height: '35rem' }} className="center">
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
        </div>
    )
}

export default withRouter(ProductDetail);