import AuthAPI from '../../api/auth'
import {
  make
} from 'vuex-pathify';

const state = {
  userId: 0,
  isUserLoggedIn: false,
  userData: [],
  errorMessage: ''
}

export default {
  namespaced: true,
  state,
  getters: {
    ...make.getters(state),
    isAuthenticated(state) {
      if (process.browser) {
        state.userId = Number(localStorage.getItem('userId'))
      }
      return state.userId !== 0 && !isNaN(state.userId)
    },
    userId(state) {
      return state.userId
    },
    userData(state) {
      return state.userData
    },
    errorMessage(state) {
      return state.errorMessage
    }
  },
  mutations: {
    ...make.mutations(state),
    AUTHENTICATING_SUCCESS(state, payload) {
      AuthAPI.setToken(payload.token)
      state.userId = payload.user_id
      if (process.browser) {
        localStorage.setItem('userId', payload.user_id)
      }
    },
    AUTHENTICATING_ERROR(state) {
      state.userId = 0
      AuthAPI.removeToken()
      if (process.browser) {
        localStorage.clear()
      }
    },
    SET_USER_DATA(state, userData) {
      state.userData = userData
    },
    SET_ERROR_MESSAGE(state, errorMessage) {
      state.errorMessage = errorMessage
    },
    SET_IS_USER_LOGGED_IN(state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn
    }
  },
  actions: {
    ...make.actions(state),
    login({
      commit
    }, payload) {
      return AuthAPI.login(payload)
        .then((res) => {
          commit('AUTHENTICATING_SUCCESS', res.data)
          commit('SET_USER_DATA', res.data)
          commit('SET_IS_USER_LOGGED_IN', true)
          commit('SET_ERROR_MESSAGE', '')
        })
        .catch((err) => {
          const errorMsg = err.message
          commit('AUTHENTICATING_ERROR')
          if (errorMsg == 'Network Error')
            commit('SET_ERROR_MESSAGE', errorMsg)
          else if (errorMsg == 'Request failed with status code 401')
            commit('SET_ERROR_MESSAGE', 'Invalid Username or Password')
          else
            commit('SET_ERROR_MESSAGE', 'Internal Server Error')
          return Promise.reject(err)
        })
    },
    logout({
      commit
    }) {
      return AuthAPI.logout()
        .then(() => {
          commit('SET_IS_USER_LOGGED_IN', false)
          commit('AUTHENTICATING_ERROR')
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    },
    socialCallback({
      commit
    }, payload) {
      return AuthAPI.socialCallback(payload)
        .then(res => commit('AUTHENTICATING_SUCCESS', res.data))
        .catch((err) => {
          commit('AUTHENTICATING_ERROR')
          return Promise.reject(err)
        })
    },
    removeSession({
      commit
    }) {
      commit('AUTHENTICATING_ERROR')
    },
    refreshToken({
      commit
    }) {
      return AuthAPI.refreshToken()
        .then(res => commit('AUTHENTICATING_SUCCESS', res.data))
        .catch((err) => {
          commit('AUTHENTICATING_ERROR')
          return Promise.reject(err)
        })
    }
  }
}