import React, { useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";

import "../styles/All.css"
import "../styles/GameList.css"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {Box, Button, GridList, GridListTile, GridListTileBar, Typography} from "@material-ui/core"

import GameService from '../services/GameService'

const UserGameList = (props) => {

    const [games, setGames] = useState("")

    const {user: currentUser} = useSelector((state) => state.auth)

    useEffect(() => {
        GameService.findAllUserGames(currentUser.id)
            .then(response => {
                setGames(response.data)
                console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) {
        return 4;
        }

        if (isWidthUp('lg', props.width)) {
        return 3;
        }

        if (isWidthUp('md', props.width)) {
        return 2;
        }

        return 1;
    }

    return (
    <Box className="margin">
        <Typography variant="h4">MES JEUX</Typography>
        <Link to={"/games"}>
            <Button variant="contained">Liste de tous jeux</Button>
        </Link>
        <GridList cellHeight={260} cols={getGridListCols()} spacing={15}>
            {
                games.length > 0
                ?
                games.map((game) =>
                    <GridListTile key={game.id} cols={game.cols || 1}>
                        <Link to={`/games/${game.id}`}>
                        <img src={game.image} alt={game.title} style={{ width: "100%" }} className="MuiGridListTile-imgFullHeight" />
                            <GridListTileBar
                                title={game.title}
                                subtitle={game.description}
                            />
                        </Link>                                  
                    </GridListTile>  
                
                )
                :
                <div>
                    <Typography variant="h5">Vous n'avez choisi aucun jeu</Typography>
                </div>
            }
        </GridList>
    </Box>
    )
}

export default withWidth()(UserGameList)