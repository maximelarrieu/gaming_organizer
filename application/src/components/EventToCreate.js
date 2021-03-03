import React, { Component } from 'react'
import DateTimePicker from 'react-datetime'
import {Link} from 'react-router-dom'

import '../styles/All.css'
import '../styles/EventCreate.css'
// import "react-datetime/css/react-datetime.css";
import AddIcon from '@material-ui/icons/Add';
import { Button, TextField } from '@material-ui/core';

import EventService from '../services/EventService'
import GameService from "../services/GameService";

export default class EventToCreate extends Component {
    constructor(props) {
        super(props);
        this.getGame = this.toCreate.bind(this)

        this.state = {
            game: {
                id: null,
                title: ""
            }
        }
    }

    componentDidMount(data) {
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

    toCreate(id) {
        EventService.toCreate(id)
            .then(response => {
                this.setState({
                    game: response.data
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log("Jeu introuvable : " + error)
            })
    }

    render() {
        const {game} = this.state
        // console.log("state =" + this.state.game_id)
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
                    {/*<TextField required id="standard-required" variant="outlined" type="number" label="Jeu" value={this.state.game_id} onChange={this.onChangeGameId} name="players" />*/}
                    <Link to={'/events'}>
                        <Button variant="contained" type="submit">
                            <AddIcon /> Valider
                        </Button>
                    </Link>
                </form>
            </div>
        )
    }
}