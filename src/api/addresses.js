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
    async list(params) {
        const response = await api.get('addresses', params)
        return response
    },
    delete(id) {
        return api.delete('address', id)
    }
}