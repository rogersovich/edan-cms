import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import auth from './auth'

const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      path: ['auth.token', 'auth.profile'],
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key),
      },
    }),
  ],
})
