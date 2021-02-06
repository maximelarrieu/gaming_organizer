import http from '../http-common'

class GameService {
    findAll() {
        return http.get('/games')
    }

    findOne(id) {
        return http.get(`/games/${id}`)
    }
}

export default new GameService();