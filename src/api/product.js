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
    upload(params) {
        console.log(params)
        return api.post('upload', params)
    },
    list(user_id, status) {
        if (status === 'O') {
            return api.get(`products/${user_id}/` + status)
        } else if (status === 'V') {
            return api.get(`products/${user_id}/` + status)
        } else {
            return api.get(`products/` + user_id)
        }
    },
    listAdmin(user_id, status) {
        if (status === 'O') {
            return api.get(`/admin/products/${user_id}/` + status)
        } else if (status === 'V') {
            return api.get(`/admin/products/${user_id}/` + status)
        } else {
            return api.get(`/admin/products/` + user_id)
        }
    },
    archive(product) {
        return api.patch('product', product)
    },
    delete(id) {
        return api.delete('product', id)
    },
    search(name) {
        return api.get('product/search/' + name)
    }
}