import api from './api'

export default {
    add(product) {
        return api.post('product', product)
    },
    get(id) {
        return api.get('product/' + id)
    },
    update(product) {
        return api.post('product', product)
    },
    list(status) {
        if (status === 'O') {
            return api.get(`products/` + status)
        } else if (status === 'V') {
            return api.get(`products/` + status)
        } else {
            return api.get(`products`)
        }
    },
    delete(id) {
        return api.delete('product', id)
    },
    search(name) {
        return api.get('product/search/' + name)
    }
}