<template>
  <div class="home">
    <h1>Carteira</h1>
    <h2>Saldo disponível: R$ {{ personalInfo.balance }}</h2>
    <OfferCard
      v-for="company in companies"
      :key="company.code"
      :company="company"
    />
  </div>
</template>

<script lang="ts">
import OfferCard from '@/components/OfferCard.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    OfferCard
  },
  setup() {
    const store = useStore()

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

    return {
      companies,
      personalInfo: computed(() => store.getters['market/getAccount'])
    }
  }
})
</script>
