import React, {Component, ReactText} from 'react'

import '../styles/All.css'
import {Box, Grid, Paper} from '@material-ui/core';

import EventService from '../services/EventService'

export default class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.getEvent = this.findOne.bind(this)

        this.state = {
            event: [],
            game: {}
        }
    }

    componentDidMount() {
        this.getEvent(this.props.match.params.id)
    }

    findOne(id) {
        EventService.findOne(id)
            .then(response => {
                this.setState({
                    event: response.data,
                    game: response.data.Game
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const {event} = this.state
        const {game} = this.state
        return (
            <Box className="margin">
                <Grid container spacing={3}>
                    <Grid item xl={8} lg={8} md={6}>
                        <img src={game.image} alt={game.title} style={{ width: "100%" }} />
                    </Grid>
                    <Grid item xl={4} lg={4} md={6}>
                        <h2>{event.title}</h2>
                        <p>{game.title}</p>
                        <i>{event.description}</i>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}