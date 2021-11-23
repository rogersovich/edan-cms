export const SET_AUTHENTICATION = (state, payload) => {
  state.token = payload.token
}

export const SET_PROFILE = (state, payload) => {
  state.profile.name = payload.name
  state.profile.email = payload.email
  state.profile.role = payload.role
  state.profile.username = ''
}

export const REMOVE_TOKEN = state => {
  state.token = ''
}

export const REMOVE_PROFILE = state => {
  state.profile.name = ''
  state.profile.email = ''
  state.profile.role = ''
  state.profile.username = ''
}
