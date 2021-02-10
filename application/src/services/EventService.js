import http from '../http-common'

class EventService {
    findAll() {
        return http.get('/events')
    }

    create(data) {
        return http.post("/events", data)
    }

    // findAllByGames() {
    //     return http.get('/games/:id')
    // }
}

export default new EventService();