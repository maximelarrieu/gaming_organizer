import http from '../http-common'

class AuthService {
    register(data) {
        return http.post('/register', data)
    }

    login(username, password) {
        return http.post('/login', {username: username, password: password})
            .then(response => {
                if(response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data
            })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    logout = () => {
        localStorage.removeItem("user");
    };
}

export default new AuthService();