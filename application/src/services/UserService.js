import http from '../http-common'

class UserService {
    profile(id) {
        return http.get(`profile/${id}`)
    }
}

export default new UserService();