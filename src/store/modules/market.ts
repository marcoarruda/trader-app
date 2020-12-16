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
    account: null,
    myPapers: []
  }),
  mutations: {
    mSetCompanies(state: marketState, valor: any) {
      state.companies = valor
    },
    mSetAccount(state: marketState, valor: any) {
      state.account = valor
    },
    mSetMyPapers(state: marketState, valor: any) {
      state.myPapers = valor
    }
  },
  actions: {
    setCompanies(context: ActionContext<marketState, any>, valor: any) {
      context.commit('mSetCompanies', valor)
    },
    setAccount(context: ActionContext<marketState, any>, valor: any) {
      context.commit('mSetAccount', valor)
    },
    setMyPapers(context: ActionContext<marketState, any>, valor: any) {
      context.commit('mSetMyPapers', valor)
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
