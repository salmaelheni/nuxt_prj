
import Vuex from 'vuex'

const createStore = () => {
  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store({
    state: {
      token: '',
      sessionid:''
    },
    mutations: {
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = ''
      },
      setSessionId(state, sessionid) {
        state.sessionid = sessionid
      },
      clearSessionId(state) {
        state.sessionid = ''
      },
    },
    getters: {
    isLoggedIn: (state) => state.token,
    getSessionId: (state) => state.sessionid,
  },
  })
}

export default createStore