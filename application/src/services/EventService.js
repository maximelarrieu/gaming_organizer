import http from '../http-common'

class EventService {
    findAll() {
        return http.get('/events')
    }

    findOne(id) {
        return http.get(`/events/${id}`)
    }

    toCreate(id, user) {
        return http.get(`events/${id}/create/${user}`)
    }

    create(data) {
        return http.post(`/events/${data.game_id}/create/${data.organizer_id}`, data)
    }

    addUser(event, user) {
        console.log(event)
        return http.post(`/events/${event}/add/${user}`)
    }
}

export default new EventService();