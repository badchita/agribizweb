import api from './api'

export default {
    login(auth) {
        return api.post('login', auth)
    },
}