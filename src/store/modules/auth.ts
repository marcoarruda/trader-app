import { ActionContext } from 'vuex'
import { Auth } from 'aws-amplify'

type authState = {
  user: any
}

const auth = {
  state: () => ({
    user: null
  }),
  mutations: {
    mSetUser(state: authState, valor: any) {
      state.user = valor
    }
  },
  actions: {
    setUser(context: ActionContext<authState, any>, valor: any) {
      context.commit('mSetUser', valor)
    }
  },
  getters: {
    getUser(state: authState) {
      return state.user
    },
    getUserIsAuth(state: authState) {
      return state.user !== null
    }
  }
}

export default auth
