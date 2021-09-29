export const SET_AUTHENTICATION = (state, payload) => {
  state.token = payload.token
  state.profile = payload.profile
}

export const SET_PROFILE = (state, payload) => {
  state.profile = payload.profile
}

export const REMOVE_TOKEN = state => {
  state.token = ''
}

export const REMOVE_PROFILE = state => {
  state.profile = {}
}

export const SET_LOADING = state => {
  state.loading = !state.loading
}
