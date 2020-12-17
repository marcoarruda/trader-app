<template>
  <div class="content">
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
</template>

<script lang="ts">
import OfferCard from '@/components/OfferCard.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Market',
  components: {
    OfferCard
  },
  setup() {
    const store = useStore()

    return {
      companies: computed(() => store.getters['market/getCompanies']),
      personalInfo: computed(() => store.getters['market/getAccount'])
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
