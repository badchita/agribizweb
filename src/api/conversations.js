import api from './api'

export default {
    list(params) {
        return api.get(`conversations`, {
            params
        })
    },
    add(params) {
        return api.post(`/conversation`, params)
    },
}