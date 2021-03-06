<template>
  <div class="content" v-if="!loading">
    <div class="market-header">
      <h1>Carteira</h1>
      <h2>
        Saldo disponível:
        {{ numeral(personalInfo.balance).format('$ 0,0.00') }}
      </h2>
      <h2>
        Patrimônio:
        <template v-if="!loadingOperation">
          {{ numeral(propertyValue).format('$ 0,0.00') }}
        </template>
        <template v-else>Calculando...</template>
      </h2>
    </div>
    <div v-if="companies.length > 0" class="cards-container">
      <OfferCard
        v-for="company in companies"
        :key="company.code"
        :company="company"
        :wallet="true"
      />
    </div>
    <div class="no-papers" v-else>
      Nenhuma ação encontrada. Visite o nosso
      <router-link to="/market">Mercado!</router-link>
    </div>
  </div>
  <div class="content" v-else>
    <LoadingSpinner
      :style="{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }"
    />
  </div>
</template>

<script lang="ts">
import OfferCard from '@/components/OfferCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { graphqlOperation, API } from 'aws-amplify'
import { listAccounts, listPapers } from '@/graphql/queries'
import numeral from 'numeral'

export default defineComponent({
  name: 'Home',
  components: {
    OfferCard,
    LoadingSpinner
  },
  setup() {
    const store = useStore()
    const loading = ref(true)

    // const balance = computed(() =>
    //   numeral(personalInfo.value.balance.toFixed(2)).format('0,0.00')
    // )

    const companies = computed(() => {
      return store.getters['market/getMyPapers'].map((paper: any) => ({
        ...paper.company,
        quantity: paper.quantity,
        total: paper.company.price * paper.quantity
      }))
    })

    onMounted(async () => {
      const accountStore = store.getters['market/getAccount']
      const papersStore = store.getters['market/getMyPapers']

      if (accountStore.id && papersStore.length > 0) {
        loading.value = false
        return
      }

      const filter = {
        owner: { eq: store.getters['auth/getUser'].username }
      }

      const accounts: any = await API.graphql({
        query: listAccounts,
        variables: {
          filter
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })
      store.dispatch('market/setAccount', accounts.data.listAccounts.items[0])

      // const papers: any = await API.graphql(
      //   graphqlOperation(listPapers, {
      //     filter: {
      //       accountID: {
      //         eq: accounts.data.listAccounts.items[0].id
      //       }
      //     }
      //   })
      // )

      const papers: any = await API.graphql({
        query: listPapers,
        variables: {
          filter: {
            accountID: {
              eq: accounts.data.listAccounts.items[0].id
            }
          }
        }
      })

      store.dispatch('market/setMyPapers', papers.data.listPapers.items)
      loading.value = false
    })

    const propertyValue = computed(() => {
      const balance = store.getters['market/getAccount'].balance

      const properties = store.getters['market/getMyPapers'].reduce(
        (accumulator: number, paper: any) =>
          accumulator + paper.company.price * paper.quantity,
        0
      )

      return balance + properties
    })

    return {
      companies,
      loading,
      numeral,
      propertyValue,
      loadingOperation: computed(() => store.getters.getLoading),
      personalInfo: computed(() => store.getters['market/getAccount'])
    }
  }
})
</script>

<style lang="scss" scoped>
.no-papers {
  margin-top: 50%;
  width: 100%;
  text-align: center;
  padding: 0 15px;
}
</style>
