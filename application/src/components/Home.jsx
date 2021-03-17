import React, { Component } from 'react'
import AuthService from "../services/AuthService";

import '../styles/All.css'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentUser: AuthService.getCurrentUser()
        }
    }

    render () {
        const { currentUser } = this.state
        console.log(currentUser)
        return(
            <div className="margin">
                <h1>HOMEPAGE</h1>
                {/*<p>{currentUser.username}</p>*/}
            </div>
        )
    }
}