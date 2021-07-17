import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';

const Profile = () => {

    // const [items, setItems] = useState([]);
    // const [wish, setWish] = useState([]);
    // useEffect(() => {
    //     axios.get('/api/getRecentlyViewed').then(response => setItems(response.data))
    //     axios.get('/api/getWishlist').then(response => setWish(response.data))
    // }, [])

    const items = [
        {
            cardTitle: "1",
            vendor: "1",
            price: "1",
            currency: "1",
            image: "1",
            imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
        },
        {
            cardTitle: "2",
            vendor: "2",
            price: "2",
            currency: "2",
            image: "2",
            imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
        },
        {
            cardTitle: "3",
            vendor: "2",
            price: "2",
            currency: "2",
            image: "2",
            imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
        },
        {
            cardTitle: "4",
            vendor: "2",
            price: "2",
            currency: "2",
            image: "2",
            imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
        },
        {
            cardTitle: "5",
            vendor: "2",
            price: "2",
            currency: "2",
            image: "2",
            imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
        },
        {
            cardTitle: "6",
            vendor: "2",
            price: "2",
            currency: "2",
            image: "2",
            imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
        }
        ,
        {
            cardTitle: "7",
            vendor: "2",
            price: "2",
            currency: "2",
            image: "2",
            imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
        }
        ,
        {
            cardTitle: "8",
            vendor: "2",
            price: "2",
            currency: "2",
            image: "2",
            imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
        }
    ]

    return (
        <div className="profileDiv">
            <div>
                <h1>Recently Viewed</h1>
                <div>
                    <ul className="viewedList" id="list">
                        {
                            items.map(
                                (item, index) => {
                                    return <li>
                                        <ProductCard key={index} className="items" cardTitle={item.cardTitle} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL} />
                                    </li>
                                }
                            )
                        }
                    </ul>
                </div>
                <div>
                    <h1>Wishlist</h1>
                    <ul className="wishList">
                        {
                            items.map(
                                (item, index) => {
                                    return <li>
                                        <ProductCard key={index} className="items" cardTitle={item.cardTitle} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL} />
                                    </li>
                                }
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;