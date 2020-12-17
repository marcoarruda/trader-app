<template>
  <Header />
  <div class="container"><router-view /></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import { useStore } from 'vuex'
import { Auth, graphqlOperation, API } from 'aws-amplify'
import { listAccounts, listCompanys, listPapers } from './graphql/queries'

document.title = 'Trader App'

export default defineComponent({
  components: { Header },
  name: 'App',
  setup() {
    const store = useStore()

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
        }
      } catch (error) {
        // console.log(error)
      }
    })
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
}
</style>
