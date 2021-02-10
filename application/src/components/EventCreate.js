import { TextField } from '@material-ui/core';
import React, { Component } from 'react'

import '../styles/All.css'
import '../styles/EventCreate.css'

import Game from '../services/GameService'
import EventService from '../services/EventService'
import GameService from '../services/GameService'

export default class EventCreate extends Component {
    constructor(props) {
        super(props);
        this.saveEvent = this.saveEvent.bind(this);
        this.createEvent = this.createEvent.bind(this);

        this.state = {
            id: null,
            title: '',
            description: '',
            players: 1,
            startedAt: new Date(),
            game_id: Game.id,
            //started: false
            submitted: false
        }
    }

    onChangeTitle(data) {
        const title = data.target.value

        this.setState((prevState => {
            return {
                game: {
                    ...prevState.game,
                    title: title
                }
            }
        }))
    }

    saveEvent() {
        let data = {
            title: this.state.title,
            description: this.state.description,
            players: this.state.players,
            startedAt: this.state.startedAt,
            game_id: this.state.game_id
        };

        EventService.create(data)
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
            })
            .catch(err => {
                console.log(err)
            })
    }

    createEvent() {
        this.setState({
            id: null,
            title: "",
            description: "",
            players: 0,
            startedAt: new Date(),
            game_id: Game.id,
            submitted: false
        })
    }

    render() {
        // const {game} = this.state
        // console.log(game)
        return (
            <div className="margin">
                <h2>Création de l'évènement - Nom du jeu récupéré</h2>
                <form>
                    <TextField InputProps={{style:{color: "green"}}} required id="standard-required" label="Titre de l'évènement" />
                </form>
            </div>
        )
    }
}