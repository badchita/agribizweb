import AuthAPI from '../../api/auth'
import {
  make
} from 'vuex-pathify';

const state = {
  userId: 0,
  isUserLoggedIn: false,
  errorMessage: '',
  userType: '',
  response: {},
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
    userType(state) {
      return state.userType
    },
    response(state) {
      return state.response
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
      localStorage.setItem('token', payload.token)
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
    SET_ERROR_MESSAGE(state, errorMessage) {
      state.errorMessage = errorMessage
    },
    SET_IS_USER_LOGGED_IN(state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn
    },
    SET_USER_TYPE(state, userType) {
      state.userType = userType
    },
    SET_RESPONSE(state, response) {
      state.response = response
    }
  },
  actions: {
    ...make.actions(state),
    login({
      commit
    }, payload) {
      return AuthAPI.login(payload).then((res) => {
          commit('AUTHENTICATING_SUCCESS', res.data)
          commit('SET_RESPONSE', res.data)
          commit('SET_USER_TYPE', res.data.user_type)
          commit('SET_IS_USER_LOGGED_IN', true)
          commit('SET_IS_USER_LOGGED_IN', true)
          commit('SET_ERROR_MESSAGE', '')
        })
        .catch((err) => {
          const errorMsg = err.response
          const networkError = err.message

          commit('AUTHENTICATING_ERROR')
          if (networkError == 'Request failed with status code 500')
            commit('SET_ERROR_MESSAGE', 'Network Error')
          else if (errorMsg.status === 402 || errorMsg.status === 403 || errorMsg.status === 404 || errorMsg.status === 405 || errorMsg.status === 422)
            commit('SET_ERROR_MESSAGE', errorMsg.data.message)
          else if (errorMsg.status === 401) {
            const requiredError = errorMsg.data.errors[0] + errorMsg.data.errors[1]
            commit('SET_ERROR_MESSAGE', !errorMsg.data.errors[1] ? errorMsg.data.errors[0] : requiredError)
          }
          return Promise.reject(err)
        })
    },
    register({
      commit
    }, payload) {
      return AuthAPI.register(payload).then((res) => {
        console.log(res);
      }).catch((err) => {
        const errorMsg = err.response
        const networkError = err.message
        commit('AUTHENTICATING_ERROR')
        if (networkError == 'Request failed with status code 500')
          commit('SET_ERROR_MESSAGE', 'Network Error')
        else if (errorMsg.status === 402 || errorMsg.status === 403)
          commit('SET_ERROR_MESSAGE', errorMsg.data.message)
        else if (errorMsg.status === 401) {
          const requiredError = errorMsg.data.errors[0] + errorMsg.data.errors[1]
          commit('SET_ERROR_MESSAGE', !errorMsg.data.errors[1] ? errorMsg.data.errors[0] : requiredError)
        }
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