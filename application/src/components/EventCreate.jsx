// import React, { Component } from 'react'
// import DateTimePicker from 'react-datetime'
// import Calendar from 'rc-calendar';
// import {Link} from 'react-router-dom'

// import '../styles/All.css'
// import '../styles/EventCreate.css'
// import "../../node_modules/react-datetime/css/react-datetime.css";
// import AddIcon from '@material-ui/icons/Add';
// import { Button, Container, TextField, Typography } from '@material-ui/core';

// import EventService from '../services/EventService'
// import GameService from "../services/GameService";

// export default class EventCreate extends Component {

//     _isMounted = false;

//     constructor(props) {
//         super(props);
//         this.getGame = this.findOne.bind(this);
//         this.state = {
//             id: null,
//             title: '',
//             description: '',
//             players: 2,
//             startedAt: '',
//             game: {},
//             game_id: 1,
//             organizer_id: 0,
//             createdAt: Date.now(),
//             updatedAt: Date.now(),
//             //started: false
//             submitted: false
//         };
//         this.onChangeTitle = this.onChangeTitle.bind(this);
//         this.onChangeDescription = this.onChangeDescription.bind(this);
//         this.onChangePlayers = this.onChangePlayers.bind(this);
//         this.onChangeStartedAt = this.onChangeStartedAt.bind(this);
//         // this.onChangeGameId = this.onChangeGameId.bind(this);
//         this.saveEvent = this.saveEvent.bind(this);
//     }

//     componentDidMount() {
//         this._isMounted = true
//         this.getGame(this.props.match.params.id)
//     }

//     onChangeTitle(data) {
//         this.setState({
//             title: data.target.value
//         })
//     }
//     onChangeDescription(data) {
//         this.setState({
//             description: data.target.value
//         })
//     }
//     onChangePlayers(data) {
//         this.setState({
//             players: data.target.value
//         })
//     }
//     onChangeStartedAt(data) {
//         this.setState({
//             startedAt: data
//         })
//     }
//     // onChangeGameId(data) {
//     //     this.setState({
//     //         game_id: this.state.game_id
//     //     })
//     // }

//     findOne(id) {
//         GameService.findOne(id)
//             .then(response => {
//                 if (this._isMounted) {
//                     this.setState({
//                         game: response.data
//                     })
//                 }
//             })
//             .catch(error => {
//                 console.log("Jeu introuvable : " + error)
//             })
//     }

//     componentWillUnmount() {
//         this._isMounted = false
//     }

//     saveEvent() {
//         // e.preventDefault()

//         let data = {
//             title: this.state.title,
//             description: this.state.description,
//             players: this.state.players,
//             startedAt: this.state.startedAt,
//             game_id: this.state.game.id
//             // organizer_id: this.state.auth
//             // createdAt: Date.now(),
//             // updatedAt: Date.now()
//         };

//         EventService.create(data)
//             .then(response => {
//                 this.setState({
//                     id: response.data.id,
//                     title: response.data.title,
//                     description: response.data.description,
//                     players: response.data.players,
//                     startedAt: response.data.startedAt,
//                     game_id: this.state.game.id,
//                     // createdAt: Date.now(),
//                     // updatedAt: Date.now(),
//                     //started: ?
//                     submitted: true
//                 })
//                 console.log(response.data)
//                 this.props.history.push(`/events/${response.data.id}`)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     render() {

//         let inputProps = {
//             required: true,
//             className: "test"
//         }

//         const {game} = this.state
//         console.log(game)
//         return (
//             <Container className="margin center">
//                 <Typography variant="h3">CRÉATION DE L'ÉVÈNEMENT</Typography>
//                 <Typography variant="h5">{game.title}</Typography>
//                 <form>
//                     <div className="margin">
//                         <TextField required={true} id="standard-required" variant="outlined" label="Titre de l'évènement" value={this.state.title} onChange={this.onChangeTitle} name="title" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
//                     </div>
//                     <div className="margin">
//                     <TextField required={true} id="filled-multiline-flexible" multiline variant="outlined" label="Description" value={this.state.description} onChange={this.onChangeDescription} name="description" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
//                     </div>
//                     <div className="margin">
//                     <TextField required={true} id="standard-required" variant="outlined" type="number" label="Nombre de participant" value={this.state.players} onChange={this.onChangePlayers} name="players" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}, inputProps: {min: 2}}} />
//                     </div>
//                     <div className="margin">
//                     <Typography className="grey-label" variant="subtitle2">Date et heure de début *</Typography>
//                     <DateTimePicker timeConstraints={{minutes: {step: 5}}} inputProps={inputProps} initialValue={new Date()} dateFormat="DD-MM-YYYY" timeFormat="HH:mm" label="Début" value={this.state.startedAt} onChange={this.onChangeStartedAt} name="startedAt" InputLabelProps={{ style: {color: "grey"}, inputProps: {min: new Date()}}}/>
//                     </div>
//                     <Link to={'/events'}>
//                         <Button variant="contained" type="submit" onClick={this.saveEvent}>
//                             <AddIcon /> Valider
//                         </Button>
//                     </Link>
//                 </form>
//             </Container>
//         )
//     }
// }

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import GameService from '../services/GameService'
import EventService from '../services/EventService'

import '../styles/All.css'
// import { Button, TextField } from '@material-ui/core'
import DateTimePicker from 'react-datetime'
import {Link} from 'react-router-dom'
import { Button, Container, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const EventCreate = (props) => {
    const game = props.match.params.id
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [players, setPlayers] = useState("");
    const [startedAt, setStartedAt] = useState("")
    // const [game, setGame] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const {user: currentUser} = useSelector((state) => state.auth)

    const onChangeTitle = (data) => {
        const title = data.target.value;
        setTitle(title)
    };

    const onChangeDescription = (data) => {
        const description = data.target.value;
        setDescription(description)
    };

    const onChangePlayers = (data) => {
        const players = data.target.value;
        setPlayers(players)
    }

    const onChangeStartedAt = (data) => {
        const startedAt = data;
        setStartedAt(startedAt)
    }

    // useEffect((id) => {
    //     GameService.findOne(id)
    //     .then(response => {
    //         setGame(response.data)
    //         console.log(response.data)
    //     })
    //     .catch(error => {
    //         console.log("Jeu introuvable : " + error)
    //     })
    // }, [])

    // useEffect(() => {
    //     EventService.create(data)
    //     .then(response => {
    //         title: response.data.title,
    //         description: reponse.data.description,
    //         players: players,
    //         startedAt: startedAt,
    //         game_id: game.id
    //     })
    // })

    const handleSubmit = (event) => {
        event.preventDefault()
        // const game_id = game.id
        const user = currentUser
        console.log(user)
        const data = {
            title: title,
            description: description,
            players: players,
            startedAt: startedAt,
            game_id: game,
            organizer_id: user.id
        }
        EventService.create(data)
        .then((response) => {
            console.log(response)
            // props.history.push(`/events/${response.id}`);
            // window.location.reload();
        })
    }

    let inputProps = {
        required: true,
        className: "test"
    }

    return (
    <Container className="margin center">
        <Typography variant="h3">CRÉATION DE L'ÉVÈNEMENT</Typography>
        <Typography variant="h5">{game.title}</Typography>
        <form>
            <div className="margin">
                <TextField required={true} id="standard-required" variant="outlined" label="Titre de l'évènement" value={title} onChange={onChangeTitle} name="title" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
            </div>
            <div className="margin">
            <TextField required={true} id="filled-multiline-flexible" multiline variant="outlined" label="Description" value={description} onChange={onChangeDescription} name="description" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}}} />
            </div>
            <div className="margin">
            <TextField required={true} id="standard-required" variant="outlined" type="number" label="Nombre de participant" value={players} onChange={onChangePlayers} name="players" InputLabelProps={{ style: {color: "grey"}}} InputProps={{ style: {color: "white"}, inputProps: {min: 2}}} />
            </div>
            <div className="margin">
            <Typography className="grey-label" variant="subtitle2">Date et heure de début *</Typography>
            <DateTimePicker timeConstraints={{minutes: {step: 5}}} inputProps={inputProps} initialValue={new Date()} dateFormat="DD-MM-YYYY" timeFormat="HH:mm" label="Début" value={startedAt} onChange={onChangeStartedAt} name="startedAt" InputLabelProps={{ style: {color: "grey"}, inputProps: {min: new Date()}}}/>
            </div>
            {/* <Link to={'/events'}> */}
                <Button variant="contained" type="submit" onClick={handleSubmit}>
                    <AddIcon /> Valider
                </Button>
            {/* </Link> */}
        </form>
    </Container>
    )

}

export default EventCreate