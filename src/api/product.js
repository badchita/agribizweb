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
        return api.post('upload', params)
    },
    list(params) {
        return api.get(`/products`, {
            params
        })
    },
    listAdmin(params) {
        return api.get(`/admin/products`, {
            params
        })
    },
    archive(product) {
        return api.patch('product', product)
    },
    delete(id) {
        return api.delete('product', id)
    },
    search(name, user_Id) {
        return api.get(`product/search/${name}/${user_Id}`)
    },
    searchAll(name) {
        return api.get(`product/searchall/${name}`)
    }
}