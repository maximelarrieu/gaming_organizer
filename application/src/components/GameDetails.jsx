import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

import '../styles/GameDetails.css'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {GridList, GridListTile, GridListTileBar, IconButton, Container, Image, Typography, Box} from "@material-ui/core"
import PersonIcon from '@material-ui/icons/Person';

import GameService from '../services/GameService'

const GameDetails = (props) => {
    const [game, setGame] = useState("")
    const [events, setEvents] = useState("")
    const [users, setUsers] = useState("")
    const {user: currentUser} = useSelector((state) => state.auth)

    useEffect(() => {
        GameService.findOne(props.match.params.id)
        .then(response => {
            setGame(response.data)
            setEvents(response.data.Events)
            setUsers(response.data.Users)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) {
        return 3;
        }

        if (isWidthUp('lg', props.width)) {
        return 3;
        }

        if (isWidthUp('md', props.width)) {
        return 2;
        }

        return 1;
    }

    const handleSubmit = (game) => {
        game.preventDefault()
        GameService.addUser(props.match.params.id, JSON.stringify(currentUser.id))
        window.location.reload()
    }

    const isInGame = (list, user) => {
        for(let index = 0; index < list.length; index++) {
            if(list[index].id === user.id) {
                return true
            }
        }
        return false
    }

    return (
        <Box className="margin">
            <img src={game.image} alt={game.title} className="background-img"/>
            <Container className="center margin">
                <Typography variant="h6"><Moment format="DD-MM-YYYY">{game.releasedAt}</Moment></Typography>
                <p>{game.description}</p>
                {
                    isInGame(users, currentUser)
                    ?
                    <Typography variant="h6" style={{color: '#50b15f'}}><CheckIcon /> Ce jeu est dans votre liste</Typography>
                    :
                    <Button variant="contained" type="submit" onClick={handleSubmit}>
                        <AddIcon /> Ajouter à ma liste
                    </Button>
                }
            </Container>
            <Box className="margin">
                <Link to={`/events/${game.id}/create/${currentUser.id}`}>
                    <Button variant='contained' style={{backgroundColor: "#FFFFFF"}} startIcon={<AddIcon /> }>
                        Créer une évènement
                    </Button>
                </Link>
                <Typography variant="h5" style={{textTransform: 'uppercase'}}>Évènements en cours</Typography>
                <GridList cellHeight={260} cols={getGridListCols()} spacing={20}>
                    {
                        events.length > 0
                        ?
                        events.map((event) => {
                            return (
                                <GridListTile key={event.id} cols={event.cols}>
                                    <Link to={`/events/${event.id}`}>
                                        <img src={game.image} alt={event.title} style={{width: "100%"}}
                                                className="MuiGridListTile-imgFullHeight"/>
                                        <GridListTileBar
                                            title={event.title}
                                            subtitle={event.description}
                                            actionIcon={
                                                <IconButton className="icon">
                                                    <PersonIcon className="players"/> 0 / {event.players}
                                                </IconButton>
                                            }
                                        />
                                    </Link>
                                </GridListTile>
                            )
                        })
                        :
                        <Typography variant="h5">Aucuns évènements en cours</Typography>
                    }
                </GridList>                       
            </Box>
        </Box>
    )
 }

export default withWidth()(GameDetails)