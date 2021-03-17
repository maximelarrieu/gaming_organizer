import http from '../http-common'

class AuthService {
    register(data) {
        return http.post('/register', data)
    }

    login(data) {
        return http.post('/login', {data})
            .then(response => {
                console.log(response.data)
                if(response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                console.log(response.data)
                return response.data
            })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();