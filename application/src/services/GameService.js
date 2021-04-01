import http from '../http-common'

class GameService {
    findAll() {
        return http.get('/games')
    }

    findAllUserGames(user) {
        return http.get(`/games/user/${user}`)
    }

    findOne(id) {
        return http.get(`/games/${id}`)
    }
}

export default new GameService();