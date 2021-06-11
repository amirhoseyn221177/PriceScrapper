import React from 'react'
import { TextField, Button } from '@material-ui/core';
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
                    <Button variant="contained" color="primary">
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default Register