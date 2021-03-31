import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

import '../styles/GameDetails.css'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {GridList, GridListTile, GridListTileBar, IconButton, Container, Image, Typography, Box} from "@material-ui/core"
import PersonIcon from '@material-ui/icons/Person';

import GameService from '../services/GameService'

const GameDetails = (props) => {
    const [game, setGame] = useState("")
    const [events, setEvents] = useState("")
    const {user: currentUser} = useSelector((state) => state.auth)

    useEffect(() => {
        GameService.findOne(props.match.params.id)
        .then(response => {
            // console.log(response.data.Events)
            setGame(response.data)
            setEvents(response.data.Events)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) {
        return 3;
        }

        if (isWidthUp('lg', props.width)) {
        return 3;
        }

        if (isWidthUp('md', props.width)) {
        return 2;
        }

        return 1;
    }

    // componentDidMount() {
    //     this.getGame(this.props.match.params.id);
    // }

    // onChangeTitle(data) {
    //     const title = data.target.value

    //     this.setState((prevState => {
    //         return {
    //             game: {
    //                 ...prevState.game,
    //                 title: title
    //             }
    //         }
    //     }))
    // }

    // findOne(id) {
    //     GameService.findOne(id)
    //         .then(response => {
    //             this.setState({
    //                 game: response.data,
    //                 events: response.data.Events
    //             })
    //             console.log(response.data)
    //             // console.log(response.data.Events)
    //         })
    //         .catch(error => {
    //             console.log("Jeu introuvable : " + error)
    //         })
    // }

    // render() {
    //     const {game} = this.state
    //     const {events} = this.state
    //     const testcss = this.state
    //     console.log(events)
        return (
            // <Box>
                <Box className="margin">
                    <img src={game.image} alt={game.title} className="background-img"/>
                    <Container className="center margin">
                        <Typography variant="h6"><Moment format="DD-MM-YYYY">{game.releasedAt}</Moment></Typography>
                        <p>{game.description}</p>
                        <Link to={`/events/${game.id}/create/${currentUser.id}`}>
                            <Button variant='contained' style={{backgroundColor: "#FFFFFF"}} startIcon={<AddIcon /> }>
                                Créer une évènement
                            </Button>
                        </Link>
                    </Container>
                    <Box className="margin">
                        <Typography variant="h5" style={{textTransform: 'uppercase'}}>Évènements en cours</Typography>
                        <GridList cellHeight={260} cols={getGridListCols()} spacing={20}>
                            {
                                // console.log(events)
                                events.length > 0
                                ?
                                events.map((event) => {
                                    return (
                                        // console.log(this.state.currentTime)
                                        <GridListTile key={event.id} cols={event.cols}>
                                            <Link to={`/events/${event.id}`}>
                                                <img src={game.image} alt={event.title} style={{width: "100%"}}
                                                     className="MuiGridListTile-imgFullHeight"/>
                                                <GridListTileBar
                                                    title={event.title}
                                                    subtitle={event.description}
                                                    actionIcon={
                                                        <IconButton className="icon">
                                                            <PersonIcon className="players"/> 0 / {event.players}
                                                        </IconButton>
                                                    }
                                                />
                                            </Link>
                                        </GridListTile>
                                    )
                                })
                                :
                                <Typography variant="h5">Aucun évènements en cours</Typography>
                            }
                        </GridList>                       
                    </Box>
                </Box>
            // </Box>
        )
    // }
}

export default withWidth()(GameDetails)