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
    async list(status) {
        if (status === 'O') {
            return await api.get(`addresses/${status}`)
        } else if (status === 'V') {
            console.log(status);
            return await api.get(`addresses/${status}`)
        } else {
            return await api.get(`addresses`)
        }
    },
    delete(id) {
        return api.delete('address', id)
    }
}