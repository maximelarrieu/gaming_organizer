import React, { Component } from 'react'
import DateTimePicker from 'react-datetime'
import {Link} from 'react-router-dom'

import '../styles/All.css'
import '../styles/EventCreate.css'
// import "react-datetime/css/react-datetime.css";
import AddIcon from '@material-ui/icons/Add';
import { Button, TextField } from '@material-ui/core';

import EventService from '../services/EventService'

export default class EventCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            description: '',
            players: 1,
            startedAt: '',
            game_id: 1,
            //started: false
            submitted: false
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePlayers = this.onChangePlayers.bind(this);
        this.onChangeStartedAt = this.onChangeStartedAt.bind(this);
        this.onChangeGameId = this.onChangeGameId.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
    }

    onChangeTitle(data) {
        this.setState({
            title: data.target.value
        })
    }
    onChangeDescription(data) {
        this.setState({
            description: data.target.value
        })
    }
    onChangePlayers(data) {
        this.setState({
            players: data.target.value
        })
    }
    onChangeStartedAt(data) {
        this.setState({
            startedAt: data
        })
    }
    onChangeGameId(data) {
        this.setState({
            game_id: data.target.value
        })
    }

    saveEvent(e) {
        e.preventDefault()

        let event = {
            title: this.state.title,
            description: this.state.description,
            players: this.state.players,
            startedAt: this.state.startedAt,
            game_id: this.state.game_id
        };

        EventService.create(event)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                    startedAt: response.data.startedAt,
                    game_id: response.data.game_id,
                    //started: ?
                    submitted: true
                })
                console.log(response.data)
                this.props.history.push('/events')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        // const {game} = this.state
        // console.log(game)
        return (
            <div className="margin">
                <h2>Création de l'évènement - Nom du jeu récupéré</h2>
                <form>
                    <div>
                        <TextField required id="standard-required" variant="outlined" label="Titre de l'évènement" value={this.state.title} onChange={this.onChangeTitle} name="title" />
                    </div>
                    <TextField required id="filled-multiline-flexible" variant="outlined" label="Description" value={this.state.description} onChange={this.onChangeDescription} name="description" />
                    <TextField required id="standard-required" variant="outlined" type="number" label="Nombre de participant" value={this.state.players} onChange={this.onChangePlayers} name="players" />
                    <DateTimePicker dateFormat="DD-MM-YYYY" timeFormat="HH:mm" label="Début" value={this.state.startedAt} onChange={this.onChangeStartedAt} name="startedAt" />
                    <TextField required id="standard-required" variant="outlined" type="number" label="Jeu" value={this.state.game_id} onChange={this.onChangeGameId} name="players" />
                    <Link to={'/events'}>
                        <Button variant="contained" type="submit" onClick={this.saveEvent}>
                            <AddIcon /> Valider
                        </Button>
                    </Link>
                </form>
            </div>
        )
    }
}