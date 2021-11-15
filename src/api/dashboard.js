import api from './api'

export default {
    list(user_id) {
        return api.get(`dashboards/` + user_id)
    },
    get(id) {
        return api.get('dashboard/' + id)
    },
}