import http from '../http-common'

class EventService {
    findAll() {
        return http.get('/events')
    }
}

export default new EventService();