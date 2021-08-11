import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Drawer, List, Divider, ListItem, ListItemText, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ChosenItem } from '../Actions/actions';

const Profile = (props) => {

    const [recent, setRecent] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [drawer, setDrawer] = useState("Profile");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [fullName, setFullName]= useState("")
    const [email , setEmail]= useState("")
    useEffect(async () => {
        try {
            let token = localStorage.getItem("token");
            if (token !== "" && token !== null) {
                const resp = await axios.get("/api/items/getRecentlyViewed", {
                    headers: {
                        "Authorization": token
                    }
                });

                const WishResp = await axios.get("/api/items/getWishList", {
                    headers: {
                        "Authorization": token
                    }
                });

                const data = await resp.data;
                const WishData = await WishResp.data.items;
                console.log(WishData);
                if (data.items.length > 0) {
                    if (data.items.length > 0) {
                        var recentList = data.items;
                        let titles = data.items.map(item => item.title)
                        let filtered = recentList.filter((item, index) => titles.indexOf(item.title) === index);
                        setRecent(filtered);
                    };
                    if (WishData.length > 0) {
                        let wishList = WishData;
                        setWishList([...new Set(wishList)]);
                    }
                }

                await getUserDetails()
            }
        } catch (e) {
            console.log(e.response.data.error.message);
            localStorage.removeItem("token");
            props.history.push("/home");
        }

    }, []);

    var updateProfile = async () => {
        try {
            const resp = await axios.post(`api/user/updateEmail/${newEmail}/${firstName}/${lastName}`, null, {
                headers: {
                    "Authorization": localStorage.getItem("token").split(" ")[1]
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


    var goToProductPage = (item, index) => {
        console.log(item);
        console.log(index);
        let base64Item = JSON.stringify(item);
        base64Item = Buffer.from(base64Item).toString("base64");
        props.history.push({
            pathname: `/productdetail/${base64Item}/${index}`
        });
    };


    var getUserDetails = async () => {
        try {
            const resp = await axios.get('/api/user/userinfo', { headers: { authorization: localStorage.getItem("token") } });
            const data = await resp.data
            console.log(data)
            if (data !== null || data  !== null || data !== ""){
                setFullName(data.Name)
                setEmail(data.username)
            }
        } catch (e) {
            console.log(e.response);
        }
    };

    return (
        <div className="profileDiv">
            <Drawer
                id="drawer"
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
                        <div>
                        <h1>Profile</h1>
                            <form noValidate>
                                <ul className="profilePage">
                                    <li key="profileName">
                                        <div className="form-name">
                                            <label>Name: {fullName}</label>
                                        </div>
                                    </li>
                                    <li key="profileEmail">
                                        <div className="form-email">
                                            <label>Email: {email} </label>
                                        </div>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>)
                    : drawer === "Update Profile" ?
                        (
                            <div className="centerDivUpdate">
                                <div>
                                <h1>Update Profile</h1>
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
                                        </ul>
                                    </form>
                                    <div id="formBtn">
                                        <Button id="updateBtn" onClick={updateProfile} >Update</Button>
                                    </div>
                                </div>
                            </div>
                        )
                        : drawer === "Recently Viewed" ?
                            (<div className="centerDivLists">
                                <h1>Recently Viewed</h1>
                                <div className="viewedDiv">
                                    <ul className="viewedList" id="list">
                                        {
                                            recent.length > 0 ?
                                                recent.map(
                                                    (item, index) => {
                                                        return <li key={index} >
                                                            <ProductCard key={index} onClick={() => goToProductPage(item, index)} className="items" cardTitle={item.title} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL} />
                                                        </li>;
                                                    }
                                                ) :
                                                <h3> No recently viewed items</h3>
                                        }
                                    </ul>
                                </div>
                            </div>)
                            :
                            (
                                <div className="centerDivLists">
                                    <h1>Wishlist</h1>
                                    <div className="wishDiv">
                                        <ul className="wishList">
                                            {
                                                wishList.length > 0 ?
                                                    wishList.map(
                                                        (item, index) => {
                                                            return <li key={index} >
                                                                <ProductCard key={index} onClick={() => goToProductPage(item, index)} className="items" cardTitle={item.title} vendor={item.vendor} price={item.price} currency={item.currency} image={item.image} itemURL={item.itemURL} />
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



const mapToProps = dispatch => {
    return {
        sendingItemArray: (item) => dispatch(ChosenItem(item))
    };
};
export default connect(null, mapToProps)(withRouter(Profile));