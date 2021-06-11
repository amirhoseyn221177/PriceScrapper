import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <div className="navbar">
            <nav>
                <ul>
<<<<<<< HEAD
=======
                    <li><Link to="/home"> Home </Link></li>
>>>>>>> f48a9da3ce8fa7cac7574569fa2e144459a27a3c
                    <li><Link to="/login"> Login </Link></li>
                    <li><Link to="/register"> Register </Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header