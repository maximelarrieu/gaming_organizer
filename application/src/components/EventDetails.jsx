import React, {Component, ReactText} from 'react'

import '../styles/All.css'
import '../styles/EventDetails.css'
import {Box, Grid, Typography} from '@material-ui/core';

import EventService from '../services/EventService'

export default class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.getEvent = this.findOne.bind(this)

        this.state = {
            event: [],
            game: {},
            organizer: {},
        }
    }

    componentDidMount() {
        this.getEvent(this.props.match.params.id)
    }

    isStarted(startedAt) {
        const now = new Date()
        console.log(Date.parse(now))
        console.log()
        if (Date.parse(now) >= Date.parse(startedAt)) {
          return true
        } else {
          return false
        }
    }

    findOne(id) {
        EventService.findOne(id)
            .then(response => {
                this.setState({
                    event: response.data,
                    game: response.data.Game,
                    organizer: response.data.User
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const {event} = this.state
        console.log(event)
        const {game} = this.state
        const {organizer} = this.state
        console.log(organizer)
        return (
            <Box className="margin">
                <Grid container spacing={3}>
                    <Grid item xl={8} lg={8} md={6}>
                        <img src={game.image} alt={game.title} style={{ width: "100%" }} />
                    </Grid>
                    <Grid item xl={4} lg={4} md={6}>
                        <h2>{event.title}</h2>
                        {
                            organizer
                            ?
                            <h4>{organizer.username}</h4>
                            :
                            <h4>NOPE</h4>
                        }
                        <p>{game.title}</p>
                        <p>{event.startedAt}</p>
                        <i>{event.description}</i>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}