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
    list(params) {
        return api.get(`/addresses`, {
            params
        })
    },
    listAdmin(params) {
        return api.get(`/admin/addresses`, {
            params
        })
    },
    archive(addresses) {
        return api.patch('address', addresses)
    },
    delete(id) {
        return api.delete('address', id)
    },
    search(name) {
        return api.get('address/search/' + name)
    }
}