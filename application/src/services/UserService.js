import http from '../http-common'

class UserService {
    findOne(id) {
        return http.get(`profile/${id}`)
    }
}

export default new UserService();