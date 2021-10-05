import api from './api'

export default {
    add(notification_user) {
        return api.post('notification_user', notification_user)
    },
    get(id) {
        return api.get('notification_user/' + id)
    },
    update(notification_user) {
        return api.put('notification_user', notification_user)
    },
    list(status) {
        if (status === 'O') {
            return api.get(`notifications_user/` + status)
        } else if (status === 'V') {
            return api.get(`notifications_user/` + status)
        } else {
            return api.get(`notifications_user`)
        }
    },
    delete(id) {
        return api.delete('notification_user', id)
    },
    search(name) {
        return api.get('notification_user/search/' + name)
    }
}