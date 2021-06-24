import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './Login.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { savingToStorage } from '../Actions/actions';
import { connect } from 'react-redux';

const Login = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState(false)

    console.log(error)
    var sendingInfoToBackEnd = async () => {
        try{
            var resp = await axios.post("/api/user/login", {}, {
                headers: {
                    'password': password,
                    'email': email
                }
            });
            const data = await resp.headers;
            if(data.autorization!==""){
                console.log(data)
                props.sendingToActions(data.authorization)
            }
            else{
                setError(true)
            }
    
        }catch(e){
            console.log(e.response.data.error.message)
        }

     
    };


    var forgotPassword = async()=>{
        // if (email!==""){
        //     const resp = await axios.post(`/api/user/forgotpass/${email}`)
        //     console.log(resp.data)
        //     setError(false)

        // }
        // else{
        //     setError(true)
        // }
        props.history.push(`/forgotpass/${email}`)

    }

    return (
        <div className="loginBox">
            <div className="loginForm">
                <h1>Login</h1>
                {error? <h5 style={{color:'red'}}>please type your email</h5>:null}
                <form noValidate >
                    <TextField onChange={e => setEmail(e.target.value)} value={email} id="standard-basic" className="form-item" label="Email" type="email" />
                    <TextField onChange={e => setPassword(e.target.value)} value={password} type="password" id="standard-basic" className="form-item" label="Password" />
                    <Button onClick={sendingInfoToBackEnd} variant="contained" color="primary">
                        Login
                    </Button>
                    <Button onClick={forgotPassword} style={{color:"blue"}}>forgot my password </Button>
                </form>
            </div>
        </div>

    );
};


const mapToProps = dispatch => {
    return {
        sendingToActions: (token) => dispatch(savingToStorage(token))
    };
};

export default connect(null, mapToProps)(withRouter(Login));
