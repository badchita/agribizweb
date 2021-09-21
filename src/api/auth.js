import api from './api'

export default {
    login(auth) {
        return api.post('login', auth)
    },
    logout() {
        return api.post('logout')
    },
    setToken(token) {
        api.defaults.headers.Authorization = 'Bearer ' + token
    },
    removeToken() {
        api.defaults.headers.Authorization = null
    },
}