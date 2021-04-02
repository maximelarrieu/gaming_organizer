import React, { useState } from 'react';

import AuthService from "../services/AuthService";

import '../styles/All.css'
import { Button, TextField, Typography } from '@material-ui/core';

const Register = (props) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const onChangeUsername = (data) => {
        const username = data.target.value;
        setUsername(username)
    }
    const onChangeEmail = (data) => {
        const email = data.target.value;
        setEmail(email)
    }
    const onChangePassword = (data) => {
        const password = data.target.value;
        setPassword(password)
    }

    const handleSubmit = (user) => {
        user.preventDefault()
        const data = {
            username: username,
            email: email,
            password: password
        }
        AuthService.register(data)
            .then(() => {
                props.history.push('/login')
            })
            .catch((err) => {
                const error = err.response.data.message
                setError(error)
            })
    }

    return (
        <div className="margin center">
        <h2>Inscription</h2>
        {
            error
            ?
            <Typography variant="subtitle2" style={{color: "red"}}>{error}</Typography>
            :
            null
        }
        <form>
            <div className="margin">
              <TextField required id="standard-required" variant="outlined" label="Nom d'utilisateur" value={username} onChange={onChangeUsername} name="username" InputLabelProps={{style: {color: "grey"}}} inputProps={{style: {color: "white"}}} />
            </div>
            <div className="margin">
              <TextField required id="standard-required" variant="outlined" label="Email" value={email} onChange={onChangeEmail} name="email" InputLabelProps={{style: {color: "grey"}}} inputProps={{style: {color: "white"}}} />
            </div>
            <div className="margin">
            <TextField required type="password" id="standard-required" variant="outlined" label="Mot de passe" value={password} onChange={onChangePassword} name="password" InputLabelProps={{style: {color: "grey"}}} inputProps={{style: {color: "white"}}} />
            </div>
            <Button className="test" variant="contained" type="submit" onClick={handleSubmit} style={{backgroundColor: "black", color: "white"}}>
                Inscription
            </Button>
        </form>
    </div>
    )
}

export default Register