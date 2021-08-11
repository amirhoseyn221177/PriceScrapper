import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import './Header.css'

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
                                <li><Link to="/home"> Home </Link></li>
                                <li><Link to="/profile"> Profile </Link></li>
                                <li><Button id="logoutBtn" onClick={logOut}>Logout</Button></li>
                            </ul>

                        )
                        :
                        (
                            <ul>
                                <li><Link to="/home"> Home </Link></li>
                                <li><Link to="/login"> Login </Link></li>
                                <li><Link to="/register"> Register </Link></li>
                            </ul>
                        )
                }
            </nav>
        </div>
    )
}

export default withRouter(Header)