import React, { Component } from 'react'

import {Link} from 'react-router-dom'

import "../styles/All.css"
import "../styles/EventList.css"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { GridList, GridListTile, GridListTileBar, Grid, Typography } from "@material-ui/core"
import PersonIcon from '@material-ui/icons/Person';

import EventService from '../services/EventService'
import Moment from 'react-moment';

class EventList extends Component {
    constructor(props) {
        super(props);
        this.findAll = this.findAll.bind(this)

        this.state = {
            events: []
        }
    }

    getGridListCols = () => {
        if (isWidthUp('xl', this.props.width)) {
        return 4;
        }

        if (isWidthUp('lg', this.props.width)) {
        return 3;
        }

        if (isWidthUp('md', this.props.width)) {
        return 2;
        }

        return 1;
    }

    componentDidMount() {
        this.findAll();
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

    findAll() {
        EventService.findAll()
            .then(response => {
                this.setState({
                    events: response.data
                });
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {events} = this.state;
        console.log(events)
        return(
            <div className="margin">
                <h3>LISTE DES EVENEMENTS</h3>
                <GridList cellHeight={260} cols={this.getGridListCols()} spacing={15}>
                    {
                        events.map((event) =>
                        {
                            return(
                            <GridListTile key={event.id} cols={event.cols || 1}>
                                <Link to={`events/${event.id}`}>
                                <img src={ event.Game.image } alt={event.title} style={{ color: (this.isStarted(event.startedAt) ? "#50b15f" : "black")}} className="card" />
                                {this.isStarted(event.startedAt) ? <Typography variant="h2" className="started">STARTED</Typography> : ""}
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
                    }
                </GridList>
            </div>
        )
    }
}

export default withWidth()(EventList)