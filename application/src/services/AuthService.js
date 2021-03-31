import http from '../http-common'

class AuthService {
    register(data) {
        console.log(data)
        return http.post('/register', data)
    }

    login(data, dato) {
        console.log(data)
        console.log(dato)
        return http.post('/login', {username: data, password: dato})
            .then(response => {
                console.log("response")
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

    logout = () => {
        localStorage.removeItem("user");
    };
}

export default new AuthService();