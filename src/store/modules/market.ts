import { ActionContext } from 'vuex'

type marketState = {
  companies: []
  account: any
  myPapers: []
}

const market = {
  namespaced: true,
  state: () => ({
    companies: [],
    account: {
      balance: 0
    },
    myPapers: []
  }),
  mutations: {
    mSetCompanies(state: marketState, value: any) {
      state.companies = value
    },
    mSetAccount(state: marketState, value: any) {
      state.account = value
    },
    mSetMyPapers(state: marketState, value: any) {
      state.myPapers = value
    }
  },
  actions: {
    setCompanies(context: ActionContext<marketState, any>, value: any) {
      context.commit('mSetCompanies', value)
    },
    setAccount(context: ActionContext<marketState, any>, value: any) {
      context.commit('mSetAccount', value)
    },
    setMyPapers(context: ActionContext<marketState, any>, value: any) {
      context.commit('mSetMyPapers', value)
    }
  },
  getters: {
    getCompanies(state: marketState) {
      return state.companies
    },
    getAccount(state: marketState) {
      return state.account
    },
    getMyPapers(state: marketState) {
      return state.myPapers
    }
  }
}

export default market
