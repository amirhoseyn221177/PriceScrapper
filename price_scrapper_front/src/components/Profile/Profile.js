import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Drawer, List, Divider, ListItem, ListItemText, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import { withRouter } from 'react-router-dom';

const Profile = (props) => {

    const [recent, setRecent] = useState([]);
    // const [wish, setWish] = useState([]);
    const [drawer, setDrawer] = useState("Recently Viewed");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [password, setpassword] = useState("");
    useEffect(async () => {
        try {
            let token = localStorage.getItem("token");
            if (token !== "" && token !== null) {
                token = token.split(" ")[1];
                const resp = await axios.get("/api/items/getRecentlyViewed", {
                    headers: {
                        "Authorization": token
                    }
                });
                const data = await resp.data;
                console.log(data);
                if (data.length > 0) setRecent(data);
            }
        } catch (e) {
            console.log(e.response.data.error.message);
            if (e.response.data.error.message.includes("jwt")) {
                localStorage.removeItem("token");
                props.history.push("/home");
            }
        }

    }, []);



    // const items = [
    //     {
    //         cardTitle: "1",
    //         vendor: "1",
    //         price: "1",
    //         currency: "1",
    //         image: "1",
    //         imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
    //     },
    //     {
    //         cardTitle: "2",
    //         vendor: "2",
    //         price: "2",
    //         currency: "2",
    //         image: "2",
    //         imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
    //     },
    //     {
    //         cardTitle: "3",
    //         vendor: "2",
    //         price: "2",
    //         currency: "2",
    //         image: "2",
    //         imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
    //     },
    //     {
    //         cardTitle: "4",
    //         vendor: "2",
    //         price: "2",
    //         currency: "2",
    //         image: "2",
    //         imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
    //     },
    //     {
    //         cardTitle: "5",
    //         vendor: "2",
    //         price: "2",
    //         currency: "2",
    //         image: "2",
    //         imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
    //     },
    //     {
    //         cardTitle: "6",
    //         vendor: "2",
    //         price: "2",
    //         currency: "2",
    //         image: "2",
    //         imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
    //     }
    //     ,
    //     {
    //         cardTitle: "7",
    //         vendor: "2",
    //         price: "2",
    //         currency: "2",
    //         image: "2",
    //         imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
    //     }
    //     ,
    //     {
    //         cardTitle: "8",
    //         vendor: "2",
    //         price: "2",
    //         currency: "2",
    //         image: "2",
    //         imageURL: "https://thumbs2.ebaystatic.com/m/mO-r2rts4ww4J3XybKZyZIg/140.jpg"
    //     }
    // ]

    // useEffect(()=>{
    //     if (drawer === "Progile") console.log(98)
    //     else if (drawer === 'Update Profile'){
    //         const 
    //     }
    //     else if (drawer === "Wishlist")

    // },[drawer])

    var updateProfile = async () => {
        try {
            await axios.post(`api/user/updateEmail/${newEmail}/${firstName}/${lastName}/${password}`, null, {
                headers: {
                    "Authorization": localStorage.getItem("token").split(" ")[1]
                }
            });
            const resp = await axios.post('/api/user/login', null, {
                headers: {
                    "email": newEmail,
                    "password": password
                }
            });
            let newToken = await resp.headers.authorization;
            localStorage.removeItem("token");
            localStorage.setItem("token", newToken);
            props.history.push("/");

        } catch (e) {
            console.log(e.response.data.error.message);
        }
    };



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
                                            <li key="updateFirstName">
                                                <div className="form-name">
                                                    <label>First Name: </label>
                                                    <TextField value={firstName} onChange={e => setFirstName(e.target.value)} className="textField" />
                                                </div>
                                            </li>
                                            <li key="updateLastName">
                                                <div className="form-name">
                                                    <label>Last Name: </label>
                                                    <TextField value={lastName} onChange={e => setLastName(e.target.value)} className="textField" />
                                                </div>
                                            </li>
                                            <li key="updateEmail">
                                                <div className="form-email">
                                                    <label>Email: </label>
                                                    <TextField value={newEmail} onChange={e => setNewEmail(e.target.value)} className="textField" type="email" />
                                                </div>
                                            </li>
                                            <li key="updatePassword">
                                                <div className="form-password">
                                                    <label>Password: </label>
                                                    <TextField value={password} onChange={e => setpassword(e.target.value)} className="textField" type="password" />
                                                </div>
                                            </li>
                                        </ul>
                                    </form>
                                    <div id="formBtn">
                                        <Button id="updateBtn" onClick={updateProfile} >Update</Button>
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
                                            recent.length > 0 ?
                                                recent.map(
                                                    (item, index) => {
                                                        return <li key={index} >
                                                            <ProductCard key={index} className="items" cardTitle={item.cardTitle} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL} />
                                                        </li>;
                                                    }
                                                ) :
                                                <div id="empty"><p> No recently viewed items</p></div>
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
                                                recent.length > 0 ?
                                                    recent.map(
                                                        (item, index) => {
                                                            return <li key={index} >
                                                                <ProductCard key={index} className="items" cardTitle={item.cardTitle} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL} />
                                                            </li>;
                                                        }
                                                    ) :
                                                    <div id="empty"><p> No items currently in wishlist</p></div>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
            }
        </div>
    );
};

export default withRouter(Profile);