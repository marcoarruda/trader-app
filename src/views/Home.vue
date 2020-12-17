<template>
  <div class="content">
    <div class="market-header">
      <h1>Carteira</h1>
      <h2>Saldo disponível: R$ {{ personalInfo.balance }}</h2>
    </div>
    <div class="cards-container">
      <OfferCard
        v-for="company in companies"
        :key="company.code"
        :company="company"
        :wallet="true"
      />
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
