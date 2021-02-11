import React, {Component} from 'react'

import '../styles/All.css'

import EventService from '../services/EventService'

export default class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.getEvent = this.findOne.bind(this)

        this.state = {
            event: [],
            game: {}
        }
    }

    componentDidMount() {
        this.getEvent(this.props.match.params.id)
    }

    findOne(id) {
        EventService.findOne(id)
            .then(response => {
                this.setState({
                    event: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const {event} = this.state
        console.log(event)
        return (
            <div className="margin">
                {/* <h2>{event.title}</h2> */}
                {
                    
                    Object.keys(event).map((key, i) => (
                        <p key={i}>
                            {event.Game['title']}
                        </p>
                    ))
                    // Object.keys(event).map().find(key => event.Game[key])
                }
            </div>
        )
    }
}