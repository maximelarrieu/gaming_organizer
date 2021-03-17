import React, { Component } from 'react';
import {Link} from 'react-router-dom'


import AuthService from "../services/AuthService";

import '../styles/All.css'
import { Button, TextField } from '@material-ui/core';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: '',
            email: '',
            password: '',
            submitted: false
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.register = this.register.bind(this)
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

    register() {
        let data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        AuthService.register(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                    password: response.data.password,
                    submitted: true
                })
                console.log(response.data)
                this.props.history.push('/')
            })
            .catch(error => {
                console.log("oups: " + error)
            })
    }

    render() {
        return (
            <div className="margin">
                <h2>S'inscrire</h2>
                <form>
                    <TextField required id="standard-required" variant="outlined" label="Nom d'utilisateur" value={this.state.username} onChange={this.onChangeUsername} name="username" />
                    <TextField required id="standard-required" variant="outlined" label="Email" value={this.state.email} onChange={this.onChangeEmail} name="email" />
                    <TextField required id="standard-required" variant="outlined" label="Mot de passe" value={this.state.password} onChange={this.onChangePassword} name="password" />
                    <Link to={'/'}>
                        <Button variant="contained" type="submit" onClick={this.register}>
                            S'inscrire
                        </Button>
                    </Link>
                </form>
            </div>
        )
    }
}
