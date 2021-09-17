import api from './api'

export default {
    login(product) {
        return api.post('login', product)
    },
}