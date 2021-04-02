import React from 'react'
import { useSelector } from "react-redux";

import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import '../styles/All.css'
import '../styles/NavBar.css'

const NavBar = () => {

    const {user: currentUser } = useSelector((state) => state.auth)

    return(
    <AppBar position="static" style={{backgroundColor: "#282c34"}}>
        <Toolbar>
            <Button>
                <a href="/" className='home-button'>
                    <img src="/logo.png" alt="gaming organizer"/>
                </a>
            </Button>
            {
                currentUser 
                ? 
                <Button>
                    <a href={'/profile/' + currentUser.id} className='others-button'>MON PROFIL</a>
                </Button>
                :
                <>
                </>
            }
            
            <Button>
                <a href="/events" className='others-button'>EVENEMENTS</a>
            </Button>
        </Toolbar>
    </AppBar>
    )
}

export default NavBar