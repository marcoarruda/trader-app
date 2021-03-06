<template>
  <Header v-if="user && $route.name !== 'Login' && $route.name !== 'Signup'" />
  <div class="container"><router-view /></div>
  <SnackBar />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import Header from '@/components/Header.vue'
import SnackBar from '@/components/SnackBar.vue'
import { useStore } from 'vuex'
import { Auth, graphqlOperation, API } from 'aws-amplify'
import {
  onCreateCompany,
  onUpdateCompany,
  onUpdateAccount
} from './graphql/subscriptions'
import numeral from 'numeral'
import 'numeral/locales/pt-br'

numeral.locale('pt-br')

document.title = 'Trader App'

export default defineComponent({
  components: { Header, SnackBar },
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
          const operationCreateCompany: any = await API.graphql(
            graphqlOperation(onCreateCompany)
          )
          const operationUpdateCompany: any = await API.graphql(
            graphqlOperation(onUpdateCompany)
          )

          // const operationUpdateAccount: any = await API.graphql(
          //   graphqlOperation(onUpdateAccount, {
          //     owner: store.getters['auth/getUser'].username
          //   })
          // )

          const operationUpdateAccount: any = await API.graphql({
            query: onUpdateAccount,
            variables: {
              owner: store.getters['auth/getUser'].username
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            authMode: 'AMAZON_COGNITO_USER_POOLS'
          })

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
              store.dispatch('market/setUpdated', true)

              // Update company inside paper object
              store.dispatch(
                'market/setMyPapers',
                papers.map((paper: any) => {
                  if (paper.company.id === data.value.data.onUpdateCompany.id) {
                    return {
                      ...paper,
                      company: {
                        ...data.value.data.onUpdateCompany,
                        trending:
                          paper.company.price -
                            data.value.data.onUpdateCompany.price >=
                          0
                            ? 'down'
                            : 'up'
                      }
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
                    console.log({
                      trending:
                        company.price - data.value.data.onUpdateCompany.price >=
                        0
                          ? 'down'
                          : 'up',
                      name: company.name
                    })
                    return {
                      ...company,
                      ...data.value.data.onUpdateCompany,
                      trending:
                        company.price - data.value.data.onUpdateCompany.price >=
                        0
                          ? 'down'
                          : 'up'
                    }
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
  outline: none;
}

a {
  color: white;
}

.container {
  margin-top: 90px;
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 90px);
  color: #fff;
}

body {
  background-color: #23272a;

  overflow-x: hidden;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
