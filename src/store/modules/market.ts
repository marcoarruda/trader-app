import { ActionContext } from 'vuex'

type marketState = {
  companies: []
  account: any
  myPapers: []
  updated: boolean
}

const market = {
  namespaced: true,
  state: () => ({
    companies: [],
    account: {
      balance: 0
    },
    myPapers: [],
    updated: false
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
    },
    mSetUpdated(state: marketState, value: any) {
      state.updated = value
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
    },
    setUpdated(context: ActionContext<marketState, any>, value: any) {
      context.commit('mSetUpdated', value)

      if (value === true) {
        setTimeout(() => {
          context.dispatch(
            'market/setCompanies',
            context.rootGetters['market/getCompanies'].map((company: any) => ({
              ...company,
              trending: undefined
            })),
            { root: true }
          )
          context.dispatch(
            'market/setMyPapers',
            context.rootGetters['market/getMyPapers'].map((paper: any) => ({
              ...paper,
              company: {
                ...paper.company,
                trending: undefined
              }
            })),
            { root: true }
          )
          context.commit('mSetUpdated', false)
        }, 21000)
      }
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
    },
    getUpdated(state: marketState) {
      return state.updated
    }
  }
}

export default market
