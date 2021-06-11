import React from 'react'
import { TextField, Button } from '@material-ui/core';
import './Login.css'

const Login = (classes) => {
    return (
        <div className="loginBox">
            <div className="loginForm">
                <h1>Login</h1>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" className="form-item" label="Email" />
                    <TextField id="standard-basic" className="form-item" label="Password" />
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default Login