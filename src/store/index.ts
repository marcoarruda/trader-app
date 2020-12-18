import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import market from '@/store/modules/market'

export default createStore({
  state: {
    message: ''
  },
  mutations: {
    mSetMessage(state, value) {
      state.message = value
    }
  },
  actions: {
    setMessage(context, value) {
      context.commit('mSetMessage', value)
    }
  },
  getters: {
    getMessage(state) {
      return state.message
    }
  },
  modules: {
    auth,
    market
  }
})
