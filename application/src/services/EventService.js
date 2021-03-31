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
        console.log(data.organizer_id)
        // console.log(data.game_id)
        return http.post(`/events/${data.game_id}/create`, data)
    }
}

export default new EventService();