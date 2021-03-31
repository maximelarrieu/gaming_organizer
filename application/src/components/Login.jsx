import React, { useState } from 'react';
import {Link} from 'react-router-dom'

import Form from 'react-validation/build/form'
import AuthService from "../services/AuthService";

import '../styles/All.css'
import { Button, TextField } from '@material-ui/core';

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import { login } from "../actions/auth";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
  
    const dispatch = useDispatch();
  
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
    //   console.log(username, password)
  
      setLoading(true);
  
    //   form.current.validateAll();
  
    //   if (checkBtn.current.context._errors.length === 0) {
        dispatch(login(username, password))
          .then(() => {
            props.history.push("/");
            window.location.reload();
          })
          .catch(() => {
            setLoading(false);
          });
    //   } else {
        // setLoading(false);
      
    };
  
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
  

    return(
        <div className="margin center">
            <h2>Connexion</h2>
            <form>
                <div className="margin">
                  <TextField required id="standard-required" variant="outlined" label="Nom d'utilisateur" value={username} onChange={onChangeUsername} name="username" InputLabelProps={{style: {color: "grey"}}} inputProps={{style: {color: "white"}}} />
                </div>
                <div className="margin">
                <TextField required type="password" id="standard-required" variant="outlined" label="Mot de passe" value={password} onChange={onChangePassword} name="password" InputLabelProps={{style: {color: "grey"}}} inputProps={{style: {color: "white"}}} />
                </div>
                    <Button className="test" variant="contained" type="submit" onClick={handleLogin} style={{backgroundColor: "black", color: "white"}}>
                        Connexion
                    </Button>
            </form>
        </div>
    )
}

export default Login
