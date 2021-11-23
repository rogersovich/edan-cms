import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dummy: {
      user: 'Kucing Kita',
    },
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      key: 'aksaraww',
      path: ['auth'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 1 }),
        removeItem: key => Cookies.remove(key),
      },
    }),
  ],
})
