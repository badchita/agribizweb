import api from './api'

export default {
    list(user_id, status) {
        if (status === 'O') {
            return api.get(`users/${user_id}/` + status)
        } else if (status === 'V') {
            return api.get(`users/${user_id}/` + status)
        } else {
            return api.get(`users/` + user_id)
        }
    },
    get(id) {
        return api.get('user/' + id)
    },
    archive(params) {
        return api.patch('user', params)
    },
}