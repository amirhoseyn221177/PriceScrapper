import React from 'react'
import { Card, Button } from 'react-bootstrap'
import './ProductCard.css'

const ProductCard = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Product 1</Card.Title>
                <Card.Text>
                    Best price at Ebay for $1
    </Card.Text>
                <Button variant="primary">Buy product!</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard