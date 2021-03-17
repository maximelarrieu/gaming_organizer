import React, { Component, Text } from 'react';
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

import '../styles/GameDetails.css'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {GridList, GridListTile, GridListTileBar, IconButton, Container, Image, Typography, Box} from "@material-ui/core"
import PersonIcon from '@material-ui/icons/Person';

import GameService from '../services/GameService'

class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.getGame = this.findOne.bind(this);
        
        this.state = {
            game: {
                id: null,
                title: ""
            },
            events: [],
        };
    }

    getGridListCols = () => {
        if (isWidthUp('xl', this.props.width)) {
        return 3;
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
        this.getGame(this.props.match.params.id);
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

    findOne(id) {
        GameService.findOne(id)
            .then(response => {
                this.setState({
                    game: response.data,
                    events: response.data.Events
                })
                console.log(response.data)
                // console.log(response.data.Events)
            })
            .catch(error => {
                console.log("Jeu introuvable : " + error)
            })
    }

    render() {
        const {game} = this.state
        const {events} = this.state
        const testcss = this.state
        console.log(events)
        return (
            <Box>
                <Box className="margin">
                    <img src={game.image} alt={game.title} className="background-img"/>
                    <Container className="center margin">
                        <Typography variant="h6"><Moment format="DD-MM-YYYY">{game.releasedAt}</Moment></Typography>
                        <p>{game.description}</p>
                        <Link to={`/events/${game.id}/create`}>
                            <Button variant='contained' style={{backgroundColor: "#FFFFFF"}} startIcon={<AddIcon /> }>
                                Créer une évènement
                            </Button>
                        </Link>
                    </Container>
                    <Box className="margin">
                        <Typography variant="h5" style={{textTransform: 'uppercase'}}>Évènements en cours</Typography>
                        <GridList cellHeight={260} cols={this.getGridListCols()} spacing={20}>
                            {
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
                            }
                        </GridList>                       
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default withWidth()(GameDetails)