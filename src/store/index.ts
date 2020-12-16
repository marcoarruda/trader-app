import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import market from '@/store/modules/market'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    market
  }
})
