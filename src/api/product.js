import api from './api'

export default {
    add(product) {
        return api.post('product', product)
    },
    get(id) {
        return api.get('product/' + id)
    },
    update(product) {
        return api.put('product', product)
    },
    async list(status) {
        if (status === 'O') {
            return await api.get(`products/${status}`)
        } else if (status === 'V') {
            return await api.get(`products/${status}`)
        } else {
            return await api.get(`products`)
        }
    },
    delete(id) {
        return api.delete('product', id)
    }
}