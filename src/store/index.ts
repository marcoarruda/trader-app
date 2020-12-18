import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import market from '@/store/modules/market'

export default createStore({
  state: {
    message: '',
    loading: false
  },
  mutations: {
    mSetMessage(state, value) {
      state.message = value
    },
    mSetLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    setMessage(context, value) {
      context.commit('mSetMessage', value)
    },
    setLoading(context, value) {
      context.commit('mSetLoading', value)
    }
  },
  getters: {
    getMessage(state) {
      return state.message
    },
    getLoading(state) {
      return state.loading
    }
  },
  modules: {
    auth,
    market
  }
})
