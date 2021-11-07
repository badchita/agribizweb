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
    list(seller_id, status) {
        if (status === 'O') {
            return api.get(`orders/${seller_id}/` + status)
        } else if (status === 'V') {
            return api.get(`orders/${seller_id}/` + status)
        } else {
            return api.get(`orders/` + seller_id)
        }
    },
    archive(payload) {
        return api.patch('address', payload)
    },
    delete(id) {
        return api.delete('order', id)
    },
    search(name) {
        return api.get('order/search/' + name)
    }
}