import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './Login.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { savingToStorage } from '../Actions/actions';
import { connect } from 'react-redux';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    var sendingInfoToBackEnd = async () => {
        try {
            var resp = await axios.post("/api/user/login", {}, {
                headers: {
                    'password': password,
                    'email': email
                }
            });
            const data = await resp.headers;
            console.log(data);
            if (data.authorization !== "" && data.authorization !== undefined) {
                console.log(data);
                props.sendingToActions(data.authorization);
                props.history.push(`/home`);
            }
            else {
                setError(true);
            }

        } catch (e) {
            setError(true);
            console.log(e.response.data.error.message);
        }


    };


  

    return (
        <div className="loginBox">
            <div className="loginForm">
                <h1>Login</h1>
                {error ? <h5 style={{ color: 'red', padding: '0', margin: '0' }}>Account cannot be found. Please sign up.</h5> : null}
                <form noValidate >
                    <TextField onChange={e => setEmail(e.target.value)} value={email} className="form-item" label="Email" type="email" />
                    <TextField onChange={e => setPassword(e.target.value)} value={password} type="password" className="form-item" label="Password" />
                    <Button onClick={sendingInfoToBackEnd} variant="contained" color="primary">
                        Login
                    </Button>
                    {/* <Button onClick={forgotPassword} style={{ color: "blue" }}>forgot my password </Button> */}
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
