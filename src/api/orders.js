import api from './api'

export default {
    add(order) {
        return api.post('order', order)
    },
    get(id) {
        return api.get('order/' + id)
    },
    update(order) {
        return api.put('order', order)
    },
    list(status) {
        if (status === 'O') {
            return api.get(`orders/` + status)
        } else if (status === 'V') {
            return api.get(`orders/` + status)
        } else {
            return api.get(`orders`)
        }
    },
    delete(id) {
        return api.delete('order', id)
    },
    search(name) {
        return api.get('order/search/' + name)
    }
}