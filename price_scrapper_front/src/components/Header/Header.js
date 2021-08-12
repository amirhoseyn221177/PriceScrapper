import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import './Header.css';
import logo from '../../logo2.png';

const Header = (props) => {
    function logOut() {
        localStorage.removeItem("token")
        props.history.push("/home")
    }
    return (
        <div className="navbar">
            <nav className="nav">
                {
                    localStorage.getItem("token") ?
                        (
                            <ul>
                                <li><img id="logo" width="100px" height="48px" src={logo} alt="logo"></img></li>
                                <li style={{float: "left"}}><Link to="/home"> Home </Link></li>
                                <li style={{float: "right"}}><Button id="logoutBtn" onClick={logOut}>Logout</Button></li>
                                <li style={{float: "right"}}><Link to="/profile"> Profile </Link></li>
                            </ul>

                        )
                        :
                        (
                            <ul>
                                <li><img id="logo" width="100px" height="48px" src={logo} alt="logo"></img></li>
                                <li style={{float: "left"}}><Link to="/home"> Home </Link></li>
                                <li style={{float: "right"}}><Link to="/register"> Register </Link></li>
                                <li style={{float: "right"}}><Link to="/login"> Login </Link></li>
                            </ul>
                        )
                }
            </nav>
        </div>
    )
}

export default withRouter(Header)