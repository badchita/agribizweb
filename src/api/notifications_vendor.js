import api from './api'

export default {
    add(params) {
        return api.post('notification_vendor', params)
    },
    get(id) {
        return api.get('notification_vendor/' + id)
    },
    update(params) {
        return api.put('notification_vendor', params)
    },
    list(params) {
        return api.get(`notifications_vendor`, {
            params
        })
    },
    archive(payload) {
        return api.patch('notification_vendor', payload)
    },
    delete(id) {
        return api.delete('notification_vendor', id)
    },
    search(seller_id, notification_vendor_number) {
        return api.get(`notification_vendor/search/${notification_vendor_number}/${seller_id}`)
    },
}