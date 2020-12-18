<template>
  <div class="content" v-if="!loading">
    <div class="market-header">
      <h1>Ofertas de Mercado</h1>
      <h2>Saldo disponível: R$ {{ personalInfo.balance.toFixed(2) }}</h2>
    </div>
    <div class="cards-container">
      <OfferCard
        v-for="company in companies"
        :key="company.code"
        :company="company"
      />
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
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import OfferCard from '@/components/OfferCard.vue'
import { listAccounts, listCompanys } from '@/graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Market',
  components: {
    OfferCard,
    LoadingSpinner
  },
  setup() {
    const store = useStore()
    const loading = ref(true)

    onMounted(async () => {
      const accountStore = store.getters['market/getAccount']
      const companiesStore = store.getters['market/getCompanies']

      if (accountStore.id && companiesStore.length > 0) {
        loading.value = false
        return
      }

      const filter = {
        owner: { eq: store.getters['auth/getUser'].username }
      }

      const accounts: any = await API.graphql(
        graphqlOperation(listAccounts, { filter })
      )
      store.dispatch('market/setAccount', accounts.data.listAccounts.items[0])
      const companies: any = await API.graphql(graphqlOperation(listCompanys))

      store.dispatch('market/setCompanies', companies.data.listCompanys.items)
      loading.value = false
    })

    return {
      companies: computed(() => store.getters['market/getCompanies']),
      personalInfo: computed(() => store.getters['market/getAccount']),
      loading
    }
  }
})
</script>

<style lang="scss">
.cards-container {
  display: grid;
  margin: 0;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-auto-rows: auto;
  width: 100vw;

  padding: 0 5px;
}

.market-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  // @media (min-width: 1000px) {
  //   flex-direction: row;
  //   justify-content: space-evenly;
  // }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }
}

.content {
  display: flex;
  flex-direction: column;
}
</style>
