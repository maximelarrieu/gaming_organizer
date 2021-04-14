import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"

import '../styles/All.css'
import '../styles/EventDetails.css'
import {Box, Grid, Button, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import VisibilityIcon from '@material-ui/icons/Visibility';

import EventService from '../services/EventService'
import UserService from '../services/UserService'

const EventDetails = (props) => {
    const [event, setEvent] = useState("")
    const [isParticipated, setIsParticipated] = useState()
    const [numberParticipants, setNumberParticipants] = useState(0)
    const [participants, setParticipants] = useState([])
    const [game, setGame] = useState("")
    const [user, setUser] = useState("")
    const {user: currentUser} = useSelector((state) => state.auth)

    useEffect(() => {
        EventService.findOne(props.match.params.id)
            .then(response => {
                setEvent(response.data)
                setParticipants(response.data.usersEvents)
                setNumberParticipants(response.data.usersEvents.length)
                setGame(response.data.Game)
                setUser(response.data.User)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        function isParticipant() {
            const test = participants.find(user => 
                (user.UserId === currentUser.id && user.EventId === event.id)
            )
            console.log(test)
            if (test !== undefined) {
                setIsParticipated(true)
            }
            console.log(isParticipated);
        }
        isParticipant()
    }, [participants])

    useEffect(() => {
        setNumberParticipants(participants.length)
    }, [numberParticipants])

    const isStarted = (startedAt) => {
        const now = new Date()
        return (Date.parse(now) >= Date.parse(startedAt))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        EventService.addOthers(props.match.params.id, JSON.stringify(currentUser.id))
        setIsParticipated(true)
        setNumberParticipants(participants.length)
    }

    console.log(event)
    console.log(participants.length)
    console.log(numberParticipants);

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
                    <Typography variant="h6">{numberParticipants} / {event.players}</Typography>
                    {
                        event.organizer_id !== currentUser.id
                        ?
                            numberParticipants === event.players
                            ?
                            <Typography variant="h6" style={{color: "red"}}>Nombre de participants maximum atteins</Typography>
                            :
                            isParticipated
                            ?
                            <Typography variant="h6" style={{color: '#50b15f'}}><CheckIcon /> Vous participez à cet évènement</Typography>
                            :
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