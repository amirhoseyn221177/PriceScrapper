import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';
import './Login.css'
import { withRouter } from 'react-router-dom';
import axios from 'axios'

const Login = props => {

    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")


    var sendingInfoToBackEnd=async()=>{
        console.log(14)
        var resp = await axios.post("/url/node",{
            headers:{
                password,
                email
            }
        })

        const data = await resp.data
        console.log(data)
    }

    return (
        <div className="loginBox">
            <div className="loginForm">
                <h1>Login</h1>
                <form  noValidate autoComplete="off">
                    <TextField autoComplete onChange={e=>setEmail(e.target.value)} value={email} id="standard-basic" className="form-item" label="Email" />
                    <TextField autoComplete onChange={e=>setPassword(e.target.value)} value={password} type="password" id="standard-basic" className="form-item" label="Password" />
                    <Button onClick={sendingInfoToBackEnd} variant="contained" color="primary">
                        Login
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default withRouter(Login)
