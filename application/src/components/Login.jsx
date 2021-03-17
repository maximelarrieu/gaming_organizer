import React, { Component } from 'react';
import {Link} from 'react-router-dom'


import AuthService from "../services/AuthService";

import '../styles/All.css'
import { Button, TextField } from '@material-ui/core';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: '',
            password: '',
            loading: false,
            message: ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.login = this.login.bind(this)
    }

    onChangeUsername(data) {
        this.setState({
            username: data.target.value
        })
    }

    onChangeEmail(data) {
        this.setState({
            email: data.target.value
        })
    }

    onChangePassword(data) {
        this.setState({
            password: data.target.value
        })
    }

    login() {
        let data = {
            username: this.state.username,
            password: this.state.password
        };

        AuthService.login(data)
            .then(response => {
                console.log(data)
                console.log(response.data)
                this.setState({
                    id: response.data.id,
                    username: response.data.username,
                    password: response.data.password,
                })
                this.props.history.push('/')
            })
            .catch(error => {
                console.log("oups: " + error)
            })
    }

    render() {
        return (
            <div className="margin">
                <h2>Connexion</h2>
                <form>
                    <TextField required id="standard-required" variant="outlined" label="Nom d'utilisateur" value={this.state.username} onChange={this.onChangeUsername} name="username" />
                    <TextField required id="standard-required" variant="outlined" label="Mot de passe" value={this.state.password} onChange={this.onChangePassword} name="password" />
                    <Link to={'/'}>
                        <Button variant="contained" type="submit" onClick={this.login}>
                            Connexion
                        </Button>
                    </Link>
                </form>
            </div>
        )
    }
}
