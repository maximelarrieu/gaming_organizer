import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import {Box, Button, Typography, GridList, GridListTile, GridListTileBar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import UserService from '../services/UserService'

const Profile = (props) => {
    const {user: currentUser} = useSelector((state) => state.auth)
    const [user, setUser] = useState("")
    // const [myEvents, setMyEvents] = useState("")
    const [events, setEvents] = useState([])

    useEffect(() => {
        UserService.profile(props.match.params.id)
        .then(response => {
            setUser(response.data)
            if (response.data.usersEvents.length > 0) {
                setEvents(response.data.usersEvents)
            }
        })
        .catch(err => {
            console.log(err)
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
        return '500px';
        }

        if (isWidthUp('lg', props.width)) {
        return '400px';
        }

        if (isWidthUp('md', props.width)) {
        return '300px';
        }

        return '250px';
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          backgroundColor: '#282c34',
        },
        gridList: {
          flexWrap: 'nowrap',
          // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
          transform: 'translateZ(0)',
        },
        title: {
          color: theme.palette.primary.light,
        },
        titleBar: {
          background:
            'rgba(0,0,0,0.7)',
        },
      }));

      const classes = useStyles();

      console.log(events)

    return(
        <Box className="margin">
            <h2>{user.username}</h2>
            {
                user.id != currentUser.id
                ?
                <Button variant="contained">Ajouter aux amis</Button>
                :
                currentUser.roles == 'ROLE_ADMIN'
                ?
                <Button variant="contained" style={{color: "red"}}>Administration</Button>
                :
                null
            }
            <Typography variant="h4">MES ÉVÈNEMENTS</Typography>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                {
                    events
                    ?
                    events.map((event) =>
                        // console.log(event.Event.organizer_id === user.id)
                        event.Event.organizer_id === user.id
                        ?
                        // console.log(event)
                        // <Link to={`/events/${event.Event.id}`}>
                        <GridListTile key={event.id} style={{width: getGridListCols()}}>
                            <img src={event.Event.Game.image} style={{color: (isStarted(event.Event.startedAt) ? "#50b15f" : "black")}} className="card" alt={event.Event.Game.title} />
                            {isStarted(event.Event.startedAt) ? <Typography variant="h3" className="started">STARTED</Typography> : ""}
                            <GridListTileBar
                            title={event.Event.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            // actionIcon={
                            //     <IconButton aria-label={`star ${tile.title}`}>
                            //     <StarBorderIcon className={classes.title} />
                            //     </IconButton>
                            // }
                            />
                        </GridListTile>
                        // </Link>
                        :
                        null
                        // <Typography variant="h5">Tu n'organises aucun évènements !</Typography>
                        
                    )
                    :
                    <Typography variant="h6">
                        Aucun évènements
                    </Typography>
                }
                </GridList>
            </div>
            <Typography variant="h4">JE PARTICIPE</Typography>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                {
                    events
                    ?
                    events.map((event) =>
                        // console.log(event.Event.organizer_id === user.id)
                        event.UserId === user.id && event.Event.organizer_id !== user.id
                        ?
                        // console.log(event)
                        <GridListTile key={event.id} style={{width: getGridListCols()}}>
                            <img src={event.Event.Game.image} style={{width: '100%'}} alt={event.Event.Game.title} />
                            <GridListTileBar
                            title={event.Event.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            // actionIcon={
                            //     <IconButton aria-label={`star ${tile.title}`}>
                            //     <StarBorderIcon className={classes.title} />
                            //     </IconButton>
                            // }
                            />
                        </GridListTile>
                        :
                        null
                        // <Typography variant="h5">Aucun évènement organisé</Typography>
                        
                    )
                    :
                    <Typography variant="h6">
                        Tu ne participes à aucun évènements !
                    </Typography>
                }
                </GridList>
            </div>
        </Box>
    )
}

export default withWidth()(Profile)