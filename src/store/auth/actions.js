export const saveAuth = ({ commit }, payload) => {
  commit('SET_AUTHENTICATION', payload)
}

export const saveProfile = ({ commit }, payload) => {
  commit('SET_PROFILE', payload)
}

export const removeCurrentUser = ({ commit }) => {
  commit('REMOVE_TOKEN')
  commit('REMOVE_PROFILE')
}
