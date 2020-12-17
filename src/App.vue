<template>
  <Header v-if="user" />
  <div class="container"><router-view /></div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import Header from '@/components/Header.vue'
import { useStore } from 'vuex'
import { Auth, graphqlOperation, API } from 'aws-amplify'
import { listAccounts, listCompanys, listPapers } from './graphql/queries'
import {
  onCreateCompany,
  onUpdateCompany,
  onUpdateAccount
} from './graphql/subscriptions'

document.title = 'Trader App'

export default defineComponent({
  components: { Header },
  name: 'App',
  setup() {
    const store = useStore()

    let createCompanyListener: any
    let updateCompanyListener: any
    let updateAccountListener: any

    onMounted(async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        store.dispatch('auth/setUser', user)

        if (user) {
          const filter = {
            owner: { eq: user.username }
          }

          const accounts: any = await API.graphql(
            graphqlOperation(listAccounts, { filter })
          )

          const companies: any = await API.graphql(
            graphqlOperation(listCompanys)
          )

          const papers: any = await API.graphql(
            graphqlOperation(listPapers, {
              filter: {
                accountID: {
                  eq: accounts.data.listAccounts.items[0].id
                }
              }
            })
          )

          store.dispatch(
            'market/setCompanies',
            companies.data.listCompanys.items
          )
          store.dispatch(
            'market/setAccount',
            accounts.data.listAccounts.items[0]
          )
          store.dispatch('market/setMyPapers', papers.data.listPapers.items)

          const operationCreateCompany: any = await API.graphql(
            graphqlOperation(onCreateCompany)
          )
          const operationUpdateCompany: any = await API.graphql(
            graphqlOperation(onUpdateCompany)
          )

          const operationUpdateAccount: any = await API.graphql(
            graphqlOperation(onUpdateAccount, {
              owner: store.getters['auth/getUser'].username
            })
          )

          createCompanyListener = operationCreateCompany.subscribe({
            next: (data: any) => {
              store.dispatch('market/setCompanies', [
                ...store.getters['market/getCompanies'],
                data.value.data.onCreateCompany
              ])
            }
          })

          updateCompanyListener = operationUpdateCompany.subscribe({
            next: (data: any) => {
              const companies = store.getters['market/getCompanies']
              const papers = store.getters['market/getMyPapers']

              // Update company inside paper object
              store.dispatch(
                'market/setMyPapers',
                papers.map((paper: any) => {
                  if (paper.company.id === data.value.data.onUpdateCompany.id) {
                    return {
                      ...paper,
                      company: data.value.data.onUpdateCompany
                    }
                  } else {
                    return paper
                  }
                })
              )

              // Update companies state
              store.dispatch(
                'market/setCompanies',
                companies.map((company: any) => {
                  if (company.id === data.value.data.onUpdateCompany.id) {
                    return { ...company, ...data.value.data.onUpdateCompany }
                  } else {
                    return company
                  }
                })
              )
            }
          })

          updateAccountListener = operationUpdateAccount.subscribe({
            next: (data: any) => {
              store.dispatch(
                'market/setAccount',
                data.value.data.onUpdateAccount
              )
            }
          })
        }
      } catch (error) {
        // console.log(error)
      }
    })

    onUnmounted(() => {
      createCompanyListener.unsubscribe()
      updateCompanyListener.unsubscribe()
      updateAccountListener.unsubscribe()
    })

    return {
      user: computed(() => store.getters['auth/getUser'])
    }
  }
})
</script>

<style lang="scss">
*,
body,
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #ffffff;
  outline: none;
}

.container {
  margin-top: 90px;
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 85px);
}

body {
  background-color: #23272a;

  overflow-x: hidden;
}
</style>
