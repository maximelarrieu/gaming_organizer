import React, { Component } from 'react';

import GameService from '../services/GameService'

export default class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.getGame = this.findOne.bind(this);
        

        this.state = {
            game: {
                id: null,
                title: ""
            },
            message: ""
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
    
    render() {
        const {game} = this.state
        return (
            <>
            <h1>{game.title}</h1>
            </>
        )
    }
}