import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li><Link to="/home"> Home </Link></li>
                    <li><Link to="/login"> Login </Link></li>
                    <li><Link to="/register"> Register </Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header