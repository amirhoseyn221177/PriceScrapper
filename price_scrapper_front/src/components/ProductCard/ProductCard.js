import React from 'react'
<<<<<<< HEAD
import { Card, Button } from 'react-bootstrap'
=======
import { Card } from 'react-bootstrap'
import { Button } from '@material-ui/core';
>>>>>>> f48a9da3ce8fa7cac7574569fa2e144459a27a3c
import './ProductCard.css'

const ProductCard = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
<<<<<<< HEAD
            <Card.Body>
                <Card.Title>Product 1</Card.Title>
                <Card.Text>
                    Best price at Ebay for $1
    </Card.Text>
                <Button variant="primary">Buy product!</Button>
=======
            <Card.Body className="cardBody">
                <Card.Title>Product 1</Card.Title>
                <Card.Text>
                    Best price at Ebay for $1
                </Card.Text>
                <Button variant="contained" color="primary">
                    Buy product!
                </Button>
>>>>>>> f48a9da3ce8fa7cac7574569fa2e144459a27a3c
            </Card.Body>
        </Card>
    )
}

export default ProductCard