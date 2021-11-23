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
    listCustomer(user_id, params) {
        console.log(params);
        return api.get(`customer/orders/` + user_id, {
            params
        })
    },
    archive(payload) {
        return api.patch('order', payload)
    },
    delete(id) {
        return api.delete('order', id)
    },
    search(seller_id, order_number) {
        return api.get(`order/search/${order_number}/${seller_id}`)
    },
    updateStatus(payload) {
        return api.patch('/order/update_status', payload)
    }
}