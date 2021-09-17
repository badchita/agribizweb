import {
  make
} from 'vuex-pathify';
const state = {
  isLoading: false
}

export default {
  namespaced: true,
  state,
  mutations: {
    ...make.mutations(state),
    SET_STATUS(state, status) {
      state.status = status
    }
  },
  actions: {
    ...make.actions(state),
    start({
      commit
    }) {
      commit('SET_STATUS', true)
    },
    finish({
      commit
    }) {
      commit('SET_STATUS', false)
    }
  }
}