import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './Login.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { savingToStorage } from '../Actions/actions';
import { connect } from 'react-redux';

const Login = props => {

    const [email, setEmail] = useState("amirsayuar221177@gmail.com");
    const [password, setPassword] = useState("sex221177");
    const [error,setError]=useState(false)

    var sendingInfoToBackEnd = async () => {

        var resp = await axios.post("/api/user/login", {}, {
            headers: {
                'password': password,
                'email': email
            }
        });
        const data = await resp.headers;
        if(data.autorization!==""){
            props.sendingToActions(data.authorization)
        }
        else{
            setError(true)
        }

    };

    return (
        <div className="loginBox">
            <div className="loginForm">
                <h1>Login</h1>
                <form noValidate >
                    <TextField onChange={e => setEmail(e.target.value)} value={email} id="standard-basic" className="form-item" label="Email" type="email" />
                    <TextField onChange={e => setPassword(e.target.value)} value={password} type="password" id="standard-basic" className="form-item" label="Password" />
                    <Button onClick={sendingInfoToBackEnd} variant="contained" color="primary">
                        Login
                    </Button>
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
