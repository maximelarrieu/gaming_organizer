import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {Box, Button, Typography, GridList, GridListTile, GridListTileBar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import UserService from '../services/UserService'

const Profile = (props) => {
    const {user: currentUser} = useSelector((state) => state.auth)
    const [user, setUser] = useState("")
    const [events, setEvents] = useState("")

    useEffect(() => {
        UserService.findOne(props.match.params.id)
        .then(response => {
            setUser(response.data)
            setEvents(response.data.Events)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          backgroundColor: 'black',
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
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
            <Typography variant="h4">ÉVÈNEMENTS</Typography>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                {
                    events.length > 0
                    ?
                    events.map((event) =>
                        // console.log(event)
                    <GridListTile key={event.id} style={{width: '500px'}}>
                        <img src={event.Game.image} alt={event.Game.title} />
                        <GridListTileBar
                        title={event.title}
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
                    )
                    :
                    <Typography variant="h6">
                        Aucun évènements
                    </Typography>
                }
                </GridList>

            </div>

        </Box>
    )
}

export default Profile