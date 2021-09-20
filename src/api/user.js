import api from './api'

export default {
    get(id) {
        return api.get('user/' + id)
    },
}