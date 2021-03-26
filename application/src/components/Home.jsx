import React, { Component } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import AuthService from "../services/AuthService";
import GameService from '../services/GameService';

import { logout } from "../actions/auth";

import { GridList, GridListTile, GridListTileBar, IconButton, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

import '../styles/All.css'
import '../styles/Home.css'

const Home = (props) => {

    const {user: currentUser } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    if (!currentUser) {
        return <Redirect to="/login" />;
      }
    // findAll() {
    //     GameService.findAll()
    //         .then(response => {
    //             this.setState({
    //                 games: response.data
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // render () {
    //     const { currentUser } = this.state
    //     console.log(currentUser)
    //     const {games} = this.state
    const logOut = () => {
        dispatch(logout());
      };
    
        return(
            <div className="margin">
                <h2>TOUS LES JEUX</h2>
                {/*<p>{currentUser.username}</p>*/}
                <div className="roott">
                <p>
                    <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>Id:</strong> {currentUser.id}
                </p>
                <p>
                    <strong>Email:</strong> {currentUser.email}
                </p>
                <a href="/" onClick={logOut}>Logout</a>

                    {/* <GridList className="gridListt" cols={4}>
                        {games.map((game) => (
                        <GridListTile key={game.id}>
                            <img src={game.image} alt={game.title} />
                            <GridListTileBar
                            title={game.title}
                            
                            actionIcon={
                                <IconButton aria-label={`star ${game.title}`}>
                                </IconButton>
                            }
                            />
                        </GridListTile>
                        ))}
                    </GridList> */}
                </div>
            </div>
        )
    // }
}

export default Home