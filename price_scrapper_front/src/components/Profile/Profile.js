import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';

const Profile = () => {

    const [items, setItems] = useState([]);
    const [wish, setWish] = useState([]);

    useEffect(() => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFAYS5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTYyNjUxMTI4NCwiZXhwIjoxNjI2NTE4NDg0fQ.uUS6CqOE_miT8UGRwf4miJh9j5KQabsYlGc8DljBV68"
        axios.get('/api/items/getRecentlyViewed').then(response => setItems(response.data))
        axios.get('/api/items/getWishList').then(response => setWish(response.data))
    }, [])

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
                            wish.map(
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