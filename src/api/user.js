import api from './api'

export default {
    list(params) {
        return api.get(`/users`, {
            params
        })
    },
    get(id) {
        return api.get('user/' + id)
    },
    update(params) {
        return api.put('user', params)
    },
    archive(params) {
        return api.patch('user', params)
    },
    search(user_id, name) {
        return api.get(`user/search/${name}/${user_id}`)
    },
    updateStatusVerification(params) {
        return api.patch(`/user/update_status_verification`, params)
    },
}