import http from '../http-common'

class EventService {
    findAll() {
        return http.get('/events')
    }

    findOne(id) {
        return http.get(`/events/${id}`)
    }

    create(data) {
        return http.post("/events", data)
    }
}

export default new EventService();