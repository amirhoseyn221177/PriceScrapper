import React, { useState } from 'react'
import { withRouter } from 'react-router';
import './Login.css';
import { TextField, Button } from '@material-ui/core';
import queryString from 'query-string';
import axios from 'axios';



const ForgotPassword = props=>{
    const [pass , setPass]=useState("")
    const [email , _]= useState(props.match.params.email)


    var changePass=async()=>{
        try{
            const resp = await axios.post(`/api/user/updatePass/${pass}/${email}`)
            console.log(resp.data)
            props.history.push("/")
        }catch(e){
            console.log(e.response.data.error.message)
        }
    }






    return (
        <div className="loginBox">
            <div className="loginForm">
                <h1>New Password </h1>
                <form noValidate >
                    <TextField onChange={e => setPass(e.target.value)} value={pass} id="standard-basic" className="form-item" label="new password " type="password" />
                    <Button onClick={changePass} variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </div>
        </div>

    );
}



export default withRouter(ForgotPassword)