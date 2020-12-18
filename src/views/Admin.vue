<template>
  <div class="admin-header">
    <CustomButton @click="openDialog">NOVA EMPRESA</CustomButton>
  </div>
  <div class="cards-container">
    <CompanyCard
      v-for="company in companies"
      :key="company.id"
      :company="company"
    />
  </div>
  <Dialog :showDialog="open" @close="open = false" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import Dialog from '@/components/Dialog.vue'
import CustomButton from '@/components/CustomButton.vue'
import CompanyCard from '@/components/CompanyCard.vue'
import { useStore } from 'vuex'
import { API, graphqlOperation } from 'aws-amplify'
import { listCompanys } from '@/graphql/queries'

export default defineComponent({
  name: 'Admin',
  components: {
    Dialog,
    CustomButton,
    CompanyCard
  },
  setup() {
    const open = ref(false)
    const store = useStore()

    const openDialog = () => {
      open.value = true
    }

    onMounted(async () => {
      const companies: any = await API.graphql(graphqlOperation(listCompanys))

      store.dispatch('market/setCompanies', companies.data.listCompanys.items)
    })

    return {
      companies: computed(() => store.getters['market/getCompanies']),
      openDialog,
      open
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-header {
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;

  button {
    margin-left: 10px;
  }
}
</style>
