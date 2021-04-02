import React, { Component, useEffect, useState } from 'react'

import {Link} from 'react-router-dom'

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
                            <Link to={`events/${event.id}`}>
                            <img src={ event.Game.image } alt={event.Game.title} style={{ color: (isStarted(event.startedAt) ? "#50b15f" : "black")}} className="card" />
                            {isStarted(event.startedAt) ? <Typography variant="h2" className="started">STARTED</Typography> : ""}
                                <GridListTileBar
                                    title={event.title}
                                    subtitle={event.description}
                                    subtitle={<Typography variant="subtitle1">Début: <Moment format="DD-MM-YYYY hh:mm">{event.startedAt}</Moment></Typography>}
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