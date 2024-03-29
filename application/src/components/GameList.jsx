import React, { useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";

import "../styles/All.css"
import "../styles/GameList.css"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {Box, GridList, GridListTile, GridListTileBar, Typography} from "@material-ui/core"

import GameService from '../services/GameService'

const GameList = (props) => {

    const [games, setGames] = useState("")

    const {user: currentUser} = useSelector((state) => state.auth)

    useEffect(() => {
        GameService.findAll()
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
        <Typography>{currentUser.username}</Typography>
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
                <Typography variant="h5">No games rn</Typography>
            }
        </GridList>
    </Box>
    )
}

export default withWidth()(GameList)