<template>
  <div class="content">
    <div class="market-header">
      <h1>Carteira</h1>
      <h2>Saldo disponível: R$ {{ personalInfo.balance.toFixed(2) }}</h2>
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
</template>

<script lang="ts">
import OfferCard from '@/components/OfferCard.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    OfferCard
  },
  setup() {
    const store = useStore()

    const companies = computed(() => {
      return store.getters['market/getMyPapers'].map((paper: any) => ({
        ...paper.company,
        quantity: paper.quantity,
        total: paper.company.price * paper.quantity
      }))
    })

    return {
      companies,
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
