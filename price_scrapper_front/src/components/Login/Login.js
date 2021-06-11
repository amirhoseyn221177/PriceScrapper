import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';
import './Login.css'
import { withRouter } from 'react-router-dom';
import axios from 'axios'

const Login = () => {

    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")


    var sendingInfoToBackEnd=async()=>{
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
                <form noValidate autoComplete="off">
                    <TextField onChange={e=>setEmail(e.target.value)} className="form-item" label="Email" />
                    <TextField onChange={e=>setPassword(e.target.value)} className="form-item" label="Password" />
                    <Button onClick={sendingInfoToBackEnd} variant="contained" color="primary">
                        Login
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default withRouter(Login)
