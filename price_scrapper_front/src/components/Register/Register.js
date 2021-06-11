import React from 'react'
import { TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import './Register.css'

const Register = (classes) => {
    return (
        <div className="signUpBox">
            <div className="signUpForm">
                <h1>Sign Up</h1>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" className="form-item" label="First Name" />
                    <TextField id="standard-basic" className="form-item" label="Last Name" />
                    <TextField id="standard-basic" className="form-item" label="Email" />
                    <TextField id="standard-basic" className="form-item" label="Password" />
                    <Button className="loginBtn" variant="primary">Sign Up</Button>
                </form>
            </div>
        </div>

    )
}

export default Register