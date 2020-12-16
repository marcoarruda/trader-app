import { ActionContext } from 'vuex'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createAccount } from '@/graphql/mutations'
import { listAccounts } from '@/graphql/queries'

type authState = {
  user: any
}

const auth = {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    mSetUser(state: authState, value: any) {
      state.user = value
    }
  },
  actions: {
    async loginAction(
      context: ActionContext<authState, any>,
      data: { username: string; password: string }
    ) {
      const user = await Auth.signIn(data)
      context.commit('mSetUser', user)

      const filter = {
        owner: { eq: user.username }
      }

      const accounts: any = await API.graphql(
        graphqlOperation(listAccounts, { filter })
      )

      if (accounts.data.listAccounts.items.length === 0) {
        const input = {
          owner: user.username,
          balance: 10000
        }
        const account: any = await API.graphql(
          graphqlOperation(createAccount, { input })
        )

        context.dispatch('market/setAccount', account.data.createAccount, {
          root: true
        })
      } else {
        context.dispatch(
          'market/setAccount',
          accounts.data.listAccounts.items[0],
          {
            root: true
          }
        )
      }
    },
    setUser(context: ActionContext<authState, any>, value: any) {
      context.commit('mSetUser', value)
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
