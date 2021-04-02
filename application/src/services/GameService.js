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

    addUser(game, user) {
        return http.post(`/games/${game}/add/${user}`)
    }
}

export default new GameService();