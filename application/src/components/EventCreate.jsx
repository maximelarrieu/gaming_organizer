import React, { Component } from 'react'
import DateTimePicker from 'react-datetime'
import Calendar from 'rc-calendar';
import {Link} from 'react-router-dom'

import '../styles/All.css'
import '../styles/EventCreate.css'
import "../../node_modules/react-datetime/css/react-datetime.css";
import AddIcon from '@material-ui/icons/Add';
import { Button, Container, TextField, Typography } from '@material-ui/core';

import EventService from '../services/EventService'
import GameService from "../services/GameService";

export default class EventCreate extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.getGame = this.findOne.bind(this);
        this.state = {
            id: null,
            title: '',
            description: '',
            players: 1,
            startedAt: '',
            game: {},
            game_id: 1,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            //started: false
            submitted: false
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePlayers = this.onChangePlayers.bind(this);
        this.onChangeStartedAt = this.onChangeStartedAt.bind(this);
        // this.onChangeGameId = this.onChangeGameId.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
    }

    componentDidMount() {
        this._isMounted = true
        this.getGame(this.props.match.params.id)
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
    // onChangeGameId(data) {
    //     this.setState({
    //         game_id: this.state.game_id
    //     })
    // }

    findOne(id) {
        GameService.findOne(id)
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        game: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Jeu introuvable : " + error)
            })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    saveEvent() {
        // e.preventDefault()

        let data = {
            title: this.state.title,
            description: this.state.description,
            players: this.state.players,
            startedAt: this.state.startedAt,
            game_id: this.state.game.id,
            // createdAt: Date.now(),
            // updatedAt: Date.now()
        };

        EventService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                    startedAt: response.data.startedAt,
                    game_id: this.state.game.id,
                    // createdAt: Date.now(),
                    // updatedAt: Date.now(),
                    //started: ?
                    submitted: true
                })
                console.log(response.data)
                this.props.history.push(`/events/${response.data.id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {game} = this.state
        console.log(game)
        return (
            <Container className="margin center">
                <Typography variant="h3">CRÉATION DE L'ÉVÈNEMENT</Typography>
                <Typography variant="h5">{game.title}</Typography>
                <form>
                    <div className="margin">
                        <TextField required id="standard-required" variant="outlined" label="Titre de l'évènement" value={this.state.title} onChange={this.onChangeTitle} name="title" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
                    </div>
                    <div className="margin">
                    <TextField required id="filled-multiline-flexible" variant="outlined" label="Description" value={this.state.description} onChange={this.onChangeDescription} name="description" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
                    </div>
                    <div className="margin">
                    <TextField required id="standard-required" variant="outlined" type="number" label="Nombre de participant" value={this.state.players} onChange={this.onChangePlayers} name="players" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
                    </div>
                    <div className="margin">
                    <DateTimePicker dateFormat="DD-MM-YYYY" timeFormat="HH:mm" label="Début" value={this.state.startedAt} onChange={this.onChangeStartedAt} name="startedAt" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
                    </div>
                    <Link to={'/events'}>
                        <Button variant="contained" type="submit" onClick={this.saveEvent}>
                            <AddIcon /> Valider
                        </Button>
                    </Link>
                </form>
            </Container>
        )
    }
}
