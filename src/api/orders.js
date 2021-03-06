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
    list(params) {
        return api.get(`orders`, {
            params
        })
    },
    listCustomer(params) {
        return api.get(`/customer/orders/`, {
            params
        })
    },
    listAdmin(params) {
        return api.get(`admin/orders`, {
            params
        })
    },
    archive(payload) {
        return api.patch('order', payload)
    },
    delete(id) {
        return api.delete('order', id)
    },
    search(order_number, seller_id) {
        return api.get(`order/search/${order_number}/${seller_id}`)
    },
    searchAll(order_number) {
        return api.get(`order/searchall/${order_number}`)
    },
    updateStatus(payload) {
        return api.patch('/order/update_status', payload)
    }
}