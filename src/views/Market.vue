te<template>
  <h1>Ofertas de Mercado</h1>
  <h2>Saldo disponível: R$ {{ personalInfo.balanceAvailable }}</h2>
  <div class="container">
    <OfferCard
      v-for="company in companies"
      :key="company.code"
      :company="company"
    />
  </div>
</template>

<script lang="ts">
import OfferCard from '@/components/OfferCard.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Market',
  components: {
    OfferCard
  },
  setup() {
    const companies = [
      {
        code: 'EPR1',
        name: 'Empresa 1',
        price: 250.35
      },
      {
        code: 'EPR2',
        name: 'Empresa 2',
        price: 112.43
      }
    ]
    const personalInfo = {
      balanceAvailable: 12540.22
    }

    return {
      companies,
      personalInfo
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
}
</style>
