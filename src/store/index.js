import {
    createStore
} from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import getters from './getters';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import modules from './modules';
import pathify from './pathify';

export default createStore({
    plugins: [
        pathify.plugin,
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state, {
                expires: 3,
                secure: true
            })
        })
    ],
    state,
    getters,
    mutations,
    actions,
    modules,
})