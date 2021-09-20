import api from './api'

export default {
    login(auth) {
        return api.post('login', auth)
    },
    setToken(token) {
        api.defaults.headers.Authorization = 'Bearer ' + token
    },
    removeToken() {
        api.defaults.headers.Authorization = null
    },
}