import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import GameService from '../services/GameService'
import EventService from '../services/EventService'

import '../styles/All.css'
import '../styles/Login.css'
// import { Button, TextField } from '@material-ui/core'
import DateTimePicker from 'react-datetime'
import {Link} from 'react-router-dom'
import { Button, Container, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const EventCreate = (props) => {
    const game = props.match.params.id
    const {user: currentUser} = useSelector((state) => state.auth)
    const organizer = props.match.params.user
    console.log(organizer)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [players, setPlayers] = useState("");
    const [startedAt, setStartedAt] = useState("")
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onChangeTitle = (data) => {
        const title = data.target.value;
        setTitle(title)
    };

    const onChangeDescription = (data) => {
        const description = data.target.value;
        setDescription(description)
    };

    const onChangePlayers = (data) => {
        const players = data.target.value;
        setPlayers(players)
    }

    const onChangeStartedAt = (data) => {
        const startedAt = data;
        setStartedAt(startedAt)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            title: title,
            description: description,
            players: players,
            startedAt: startedAt,
            game_id: game,
            organizer_id: organizer
        }
        EventService.create(data)
        .then((response) => {
            console.log(response.data)
            // props.history.push(`/events/${response.data.id}`);
            // window.location.reload();
        })
    }

    let inputProps = {
        required: true,
        className: "test"
    }

    return (
    <Container className="margin center">
        <Typography variant="h3">CRÉATION DE L'ÉVÈNEMENT</Typography>
        <Typography variant="h5">{game.title}</Typography>
        <form>
            <div className="margin">
                <TextField required={true} id="standard-required" variant="outlined" label="Titre de l'évènement" value={title} onChange={onChangeTitle} name="title" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
            </div>
            <div className="margin">
            <TextField required={true} id="filled-multiline-flexible" multiline variant="outlined" label="Description" value={description} onChange={onChangeDescription} name="description" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
            </div>
            <div className="margin">
            <TextField required={true} id="standard-required" variant="outlined" type="number" label="Nombre de participant" value={players} onChange={onChangePlayers} name="players" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}, inputProps: {min: 2}}} />
            </div>
            <div className="margin">
            <Typography className="grey-label" variant="subtitle2">Date et heure de début *</Typography>
            <DateTimePicker timeConstraints={{minutes: {step: 5}}} inputProps={inputProps} initialValue={new Date()} dateFormat="DD-MM-YYYY" timeFormat="HH:mm" label="Début" value={startedAt} onChange={onChangeStartedAt} name="startedAt" InputLabelProps={{ style: {color: "grey"}, inputProps: {min: new Date()}}}/>
            </div>
            {/* <Link to={'/events'}> */}
                <Button variant="contained" type="submit" onClick={handleSubmit}>
                    <AddIcon /> Valider
                </Button>
            {/* </Link> */}
        </form>
    </Container>
    )

}

export default EventCreate