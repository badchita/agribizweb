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
    async list(params) {
        const response = await api.get('products', params)
        return response
    },
    delete(id) {
        return api.delete('product', id)
    }
}