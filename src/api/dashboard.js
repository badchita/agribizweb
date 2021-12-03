import api from './api'

export default {
    list(params) {
        return api.get(`/dashboards`, {
            params
        })
    },
    add(params) {
        return api.post(`/dashboard`, params)
    },
    get(id) {
        return api.get('dashboard/' + id)
    },
}