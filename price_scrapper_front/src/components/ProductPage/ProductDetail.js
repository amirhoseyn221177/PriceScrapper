import React, {useState}from 'react';
import { Card } from 'react-bootstrap'
import { withRouter } from 'react-router';
import { Button } from '@material-ui/core';
import './ProductDetail.css'
import qs from 'qs'

const ProductDetail = (props) => {

    const [cardTitle, setCardTitle] = useState(Object.values(qs.parse(props.location.search))[0])
    const [vendor, setVendor] = useState(Object.values(qs.parse(props.location.search))[1])
    const [price, setPrice] = useState(Object.values(qs.parse(props.location.search))[2])
    const [currency, setCurrency] = useState(Object.values(qs.parse(props.location.search))[3])
    const [image, setImage] = useState(Object.values(qs.parse(props.location.search))[4])
    const [itemURL, setItemURL] = useState(Object.values(qs.parse(props.location.search))[5])

    return (
        <div>
            <Card style={{ width: '40rem', height: '30rem' }} className="center">
                <Card.Img variant="top" src={image} width= '640' height= '480'/>
                <Card.Body className="cardBody">
                </Card.Body>
            </Card>
            <p >
                Name: {cardTitle}
            </p>
            <p>
                Vendor: {vendor}
            </p>
            <p>
                Price: {price} {currency}
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
            <Button variant="contained" color="primary" onclick={() => window.open(props.itemURL,'_blank','resizable=yes')}>
                    Buy product!
                </Button>
        </div>
    )
}

export default withRouter(ProductDetail);
