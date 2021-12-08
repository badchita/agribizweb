import api from './api'

export default {
    list(params) {
        return api.get(`chats`, {
            params
        })
    },
    search(username) {
        return api.get(`chat/search/${username}`)
    },
}