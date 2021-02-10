import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

import '../styles/GameDetails.css'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import GameService from '../services/GameService'
// import EventService from '../services/EventService'

export default class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.getGame = this.findOne.bind(this);
        // this.getEvents = this.findAllEvents.bind(this);
        
        this.state = {
            game: {
                id: null,
                title: ""
            },
            events: []
        };
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
                    game: response.data
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log("Jeu introuvable : " + error)
            })
    }

    // findAllEvents() {
    //     EventService.findAllByGames()
    //         .then(response => {
    //             this.setState({
    //                 events: response.data
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    
    render() {
        const {game} = this.state
        // const {events} = this.state
        // console.log(events)
        return (
            <>
                <div className="margin">
                    <div className="margin-img">
                        <img src={game.image} alt={game.title} className="background-img"/>
                        <div className="center">
                            <h5><Moment format="DD-MM-YYYY">{game.releasedAt}</Moment></h5>
                            <p>{game.description}</p>
                        </div>
                        <Link to={`/events/${game.id}/create`}>
                            <Button variant='contained'>
                                <AddIcon /> Créer une évènement
                            </Button>
                        </Link>
                    </div>

                    {/* {
                        events.map((event) => {
                            <p>{event.title}</p>
                        })
                    } */}
                </div>
            </>
        )
    }
}