import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"

import '../styles/All.css'
import '../styles/EventDetails.css'
import {Box, Grid, Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

import EventService from '../services/EventService'
import UserService from '../services/UserService'

const EventDetails = (props) => {
    const [event, setEvent] = useState("")
    const [game, setGame] = useState("")
    const [user, setUser] = useState("")
    const [participants, setParticants] = useState("")
    const {user: currentUser} = useSelector((state) => state.auth)

    console.log(currentUser)

    useEffect(() => {
        EventService.findOne(props.match.params.id)
            .then(response => {
                console.log(response.data)
                setEvent(response.data)
                setGame(response.data.Game)
                setUser(response.data.User)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // useEffect(() => {
    //     EventService.findUsersInEvent(props.match.params.id)
    //         .then(response => {
    //             console.log(response.data)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }, [])

    const isStarted = (startedAt) => {
        const now = new Date()
        if (Date.parse(now) >= Date.parse(startedAt)) {
          return true
        } else {
          return false
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(JSON.stringify(currentUser.id))
        EventService.addOthers(props.match.params.id, JSON.stringify(currentUser.id))
        window.location.reload(true)
    }

    return (
        <Box className="margin">
            <Grid container spacing={3}>
                <Grid item xl={8} lg={8} md={6}>
                    <img src={game.image} alt={game.title} style={{ width: "100%" }} />
                </Grid>
                <Grid item xl={4} lg={4} md={6}>
                    <h2>{event.title}</h2>
                    {
                        event.organizer_id
                        ?
                        <div>
                            <h4>{user.username}</h4>
                            <Link to={`/profile/${user.id}`}>Voir profil</Link>
                        </div>
                        :
                        <h4>NOPE</h4>
                    }
                    <p>{game.title}</p>
                    <p>{event.startedAt}</p>
                    <i>{event.description}</i>
                    {
                        event.organizer_id !== currentUser.id
                        ?
                        <Button variant="contained" type="submit" onClick={handleSubmit}>
                            <AddIcon /> Participer
                        </Button>
                        :
                        <Button variant="contained" type="submit" onClick={handleSubmit}>
                            <VisibilityIcon /> Voir la liste des joueurs
                        </Button>
                    }

                </Grid>
            </Grid>
        </Box>
    )
}

export default EventDetails