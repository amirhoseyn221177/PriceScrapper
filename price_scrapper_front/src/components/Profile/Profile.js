import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Drawer, List, Divider, ListItem, ListItemText, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';

const Profile = () => {

    // const [items, setItems] = useState([]);
    // const [wish, setWish] = useState([]);
    const [drawer, setDrawer] = useState("Recently Viewed");

    // useEffect(() => {
    //     let token = localStorage.getItem("token").split(" ")[1];
    //     axios.get('/api/items/getRecentlyViewed', {
    //         headers: {
    //             "Authorization": token
    //         }
    //     }).then(response => setItems(response.data))
    //     axios.get('/api/items/getWishList', {
    //         headers: {
    //             "Authorization": token
    //         }
    //     }).then(response => setWish(response.data))
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
            <Drawer
                variant="permanent"
                anchor="left"
                className="drawer"
            >
                <Divider />
                <List>
                    {['Profile', 'Update Profile', 'Recently Viewed', 'Wishlist'].map((text, index) => (
                        <ListItem button key={text} onClick={() => setDrawer(text)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            {
                drawer === "Profile" ?
                    (<div className="centerDiv">
                        <h1>Profile</h1>
                        <div>
                            <form noValidate>
                                <ul className="profilePage">
                                    <li key="profileName">
                                        <div className="form-name">
                                            <label>Name: </label>
                                            <label>User name</label>
                                        </div>
                                    </li>
                                    <li key="profileEmail">
                                        <div className="form-email">
                                            <label>Email: </label>
                                            <label>User email</label>
                                        </div>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>)
                    : drawer === "Update Profile" ?
                        (
                            <div className="centerDiv">
                                <h1>Update Profile</h1>
                                <div>
                                    <form noValidate>
                                        <ul className="profilePage">
                                            <li key="updateName">
                                                <div className="form-name">
                                                    <label>Name: </label>
                                                    <TextField className="textField" />
                                                </div>
                                            </li>
                                            <li key="updateEmail">
                                                <div className="form-email">
                                                    <label>Email: </label>
                                                    <TextField className="textField" type="password" />
                                                </div>
                                            </li>
                                            <li key="updatePassword">
                                                <div className="form-password">
                                                    <label>Password: </label>
                                                    <TextField className="textField" type="password" />
                                                </div>
                                            </li>
                                        </ul>
                                    </form>
                                    <div id="formBtn">
                                        <Button id="updateBtn" >Update</Button>
                                    </div>
                                </div>
                            </div>
                        )
                        : drawer === "Recently Viewed" ?
                            (<div className="centerDiv">
                                <h1>Recently Viewed</h1>
                                <div className="viewedDiv">
                                    <ul className="viewedList" id="list">
                                        {
                                            items.map(
                                                (item, index) => {
                                                    return <li key={index} >
                                                        <ProductCard key={index} className="items" cardTitle={item.cardTitle} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL} />
                                                    </li>
                                                }
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>)
                            :
                            (
                                <div className="centerDiv">
                                    <h1>Wishlist</h1>
                                    <div className="wishDiv">
                                        <ul className="wishList">
                                            {
                                                items.map(
                                                    (item, index) => {
                                                        return <li key={index} >
                                                            <ProductCard key={index} className="items" cardTitle={item.cardTitle} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL} />
                                                        </li>
                                                    }
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
            }
        </div>
    );
};

export default Profile;