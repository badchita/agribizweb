import api from './api'

export default {
    add(addresses) {
        return api.post('address', addresses)
    },
    get(id) {
        return api.get('address/' + id)
    },
    update(addresses) {
        return api.put('address', addresses)
    },
    list(user_id, status) {
        if (status === 'O') {
            return api.get(`addresses/${user_id}/` + status)
        } else if (status === 'V') {
            return api.get(`addresses/${user_id}/` + status)
        } else {
            return api.get(`addresses/` + user_id)
        }
    },
    archive(product) {
        return api.patch('address', product)
    },
    delete(id) {
        return api.delete('address', id)
    },
    search(name) {
        return api.get('address/search/' + name)
    }
}