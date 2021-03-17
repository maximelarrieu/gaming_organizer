import React from 'react'

import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import '../styles/All.css'
import '../styles/NavBar.css'

const NavBar = () => (
    <AppBar position="static" style={{backgroundColor: "#282c34"}}>
        <Toolbar>
            <Button>
                <a href="/" className='home-button'>
                    <img src="/logo.png" alt="gaming organizer"/>
                </a>
            </Button>
            <Button>
                <a href="/games" className='others-button'>MES JEUX</a>
            </Button>
            <Button>
                <a href="/events" className='others-button'>EVENEMENTS</a>
            </Button>
        </Toolbar>
    </AppBar>
)

export default NavBar