import UserAPI from '@/api/user'
import {
    make
} from 'vuex-pathify';

const state = {
    userData: {}
}

export default {
    namespaced: true,
    state,
    getters: make.getters(state),
    mutations: make.mutations(state),
    actions: {
        ...make.actions(state),
        async loadUserData({
            commit
        }, id) {
            await UserAPI.get(id).then((response) => {
                commit('SET_USER_DATA', response.data.data)
            })
        },
        removeUserData({
            commit
        }) {
            commit('SET_USER_DATA', {})
        }
    }
}