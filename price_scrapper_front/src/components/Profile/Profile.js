import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './Profile.css';

const Profile = () => {
    var items = ["Yeezy", "shoes", "adidase"]
    var wish = ["nike", "shorts", "macbook"]

    return (
        <div className="profileDiv">
            <div>
                <h1>Recently Viewed</h1>
                <ul className="viewedList">
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Wishlist</h1>
                <ul className="wishList">
                    {wish.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;