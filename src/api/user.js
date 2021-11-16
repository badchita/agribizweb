import api from './api'

export default {
    list(id) {
        return api.get('users/' + id)
    },
    get(id) {
        return api.get('user/' + id)
    },
}