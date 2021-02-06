import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import "../styles/All.css"
import "../styles/GameList.css"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core"

import GameService from '../services/GameService'

class GameList extends Component {
    constructor(props) {
        super(props);
        this.findAll = this.findAll.bind(this);
        

        this.state = {
            games: []
        };
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

    findAll() {
        GameService.findAll()
            .then(response => {
                this.setState({
                    games: response.data
                });
                console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const {games} = this.state;
        console.log(games)
            return (
            <div className="margin">
                <h3>LISTE DES JEUX</h3>
                <GridList cellHeight={260} cols={this.getGridListCols()} spacing={15}>
                    {
                        games.map((game) =>
                            <GridListTile key={game.id} cols={game.cols || 1}>
                                <Link to={`games/${game.id}`}>
                                <img src={game.image} alt={game.title} style={{ width: "100%" }} className="MuiGridListTile-imgFullHeight" />
                                    <GridListTileBar
                                        title={game.title}
                                        subtitle={game.description}
                                    />
                                </Link>                                  
                            </GridListTile>  
                        
                        )
                    }
                </GridList>
            </div>
        )
    }
}

export default withWidth()(GameList)