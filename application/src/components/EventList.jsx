import React, { Component, useEffect, useState } from 'react'

import {Link} from 'react-router-dom'
import moment from 'moment';

import "../styles/All.css"
import "../styles/EventList.css"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { GridList, GridListTile, GridListTileBar, Grid, Typography } from "@material-ui/core"
import PersonIcon from '@material-ui/icons/Person';

import EventService from '../services/EventService'
import Moment from 'react-moment';
import { useSelector } from 'react-redux';

const EventList = (props) => {
    const [events, setEvents] = useState("")
    const {user: currentUser} = useSelector((state) => state.auth)

    useEffect(() => {
        EventService.findAll()
            .then(response => {
                setEvents(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const isStarted = (startedAt) => {
        const now = new Date()
        if (Date.parse(now) >= Date.parse(startedAt)) {
          return true
        } else {
          return false
        }
    }

    const remainingTime = (startedAt) => {
        let now = new Date
        let time = {}

        let tmp = moment(startedAt).toDate() - now
        tmp = Math.floor(tmp/1000)
        time.seconds = tmp % 60

        tmp = Math.floor((tmp - time.seconds)/60)
        time.minutes = tmp % 60

        tmp = Math.floor((tmp - time.minutes)/60)
        time.hours = tmp % 24

        tmp = Math.floor((tmp - time.hours)/24)
        time.days = tmp

        let remaining = `Début dans `
        if (time.days > 0) {
            remaining += `${time.days}j `
        }
        if (time.hours > 0) {
            remaining += `${time.hours}h `
        }
        if (time.minutes > 0) {
            remaining += `${time.minutes}m `
        }
        if (time.seconds >= 0) {
            remaining += `${time.seconds}s`
        }
        return remaining
    }

    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) {
            return 4;
        }

        if (isWidthUp('lg', props.width)) {
            return 3;
        }

        if (isWidthUp('md', props.width)) {
            return 2;
        }
        return 1;
    }

    return (
        <div className="margin">
            <h3>LISTE DES EVENEMENTS</h3>
            <GridList cellHeight={260} cols={getGridListCols()} spacing={15}>
                {
                    events.length > 0
                    ?
                    events.map((event) =>
                    {
                        return(
                        <GridListTile key={event.id} cols={event.cols || 1}>
                            <Link to={`/events/${event.id}`}>
                            <img src={ event.Game.image } alt={event.Game.title} style={{ color: (isStarted(event.startedAt) ? "#50b15f" : "black")}} className="card" />
                            {isStarted(event.startedAt) ? <Typography variant="h2" className="started">STARTED</Typography> : null}
                                <GridListTileBar
                                    title={event.title}
                                    subtitle={event.description}
                                    subtitle={<Typography variant="subtitle1">Début: {remainingTime(event.startedAt)}</Typography>}
                                    className="padding"
                                    actionIcon={
                                        <div className="align">
                                            <PersonIcon className="icon"/>
                                            <Typography variant="subtitle1">
                                                0 / {event.players}
                                            </Typography>
                                        </div>
                                    }
                                />
                            </Link>
                        </GridListTile>
                        )
                    })
                    :
                    <Typography variant='h5'>Aucun évènement</Typography>
                }
            </GridList>
        </div>
    )

}

export default withWidth()(EventList)