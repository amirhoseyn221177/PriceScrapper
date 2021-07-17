import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './Register.css';
import { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Register = props => {

    const [FirstName,setFirstName]=useState("")
    const [LastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")


    var sendingUserInfoToBackEnd=async()=>{
        try{
            const req = await axios.post("/api/user/signup",{FirstName,LastName, email,password})
            const resp = await req.data
            console.log(resp)
            props.history.push('/login')
        }catch(e){
            e.response.data.error.message ? console.log(e.response.data.error.message) : console.log(e)
        }

    }

    return (
        <Fragment>
            <div className="signUpBox">
                <div className="signUpForm">
                    <h1>Sign Up</h1>
                    <form noValidate autoComplete="off">
                        <TextField onChange={e=>setFirstName(e.target.value)} id="standard-basic" className="form-item" label="First Name" type="first name" />
                        <TextField onChange={e=>setLastName(e.target.value)} id="standard-basic" className="form-item" label="Last Name" />
                        <TextField onChange={e=>setEmail(e.target.value)} id="standard-basic" className="form-item" label="Email" type="email" />
                        <TextField onChange={e=>setPassword(e.target.value)} id="standard-basic" className="form-item" label="Password" type="password"/>
                        <Button onClick={sendingUserInfoToBackEnd} variant="contained" color="primary">
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Register);