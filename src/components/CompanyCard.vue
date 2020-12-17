<template>
  <div class="card-container">
    <h1 class="card-title">{{ company.code }}</h1>
    <h2>{{ company.name }}</h2>
    <h3 v-if="!alterar">Preço: R$ {{ company.price }}</h3>
    <CustomInput v-if="alterar" v-model="price" />
    <CustomButton
      style="margin-top: 12px"
      v-if="!alterar"
      @click="alterar = true"
      >Alterar</CustomButton
    >
    <CustomButton v-if="alterar" @click="changeCompany()">Salvar</CustomButton>
    <CustomButton
      style="margin-top: 12px"
      v-if="alterar"
      @click="alterar = false"
      >Cancelar</CustomButton
    >
    <br />
    <h3>Quantidade Vendida: {{ soldAmount }}</h3>
  </div>
</template>
<script lang="ts">
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { updateCompany } from '@/graphql/mutations'
import { listPapers } from '@/graphql/queries'
import { defineComponent, ref, computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import CustomInput from './CustomInput.vue'
import CustomButton from './CustomButton.vue'

export default defineComponent({
  name: 'CompanyCard',
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  components: {
    CustomButton,
    CustomInput
  },
  setup(props) {
    const store = useStore()
    const alterar = ref(false)
    const price = ref(props.company.price)
    const companyPapers = reactive<
      { id: string; quantity: number; companyID: string; accountID: string }[]
    >([])

    const changeCompany = async () => {
      const input = {
        id: props.company.id,
        name: props.company.name,
        code: props.company.code,
        price: price.value
      }

      await API.graphql(graphqlOperation(updateCompany, { input }))
    }

    const soldAmount = computed(() => {
      let qtd = 0
      for (const paper of companyPapers) {
        qtd += paper.quantity
      }
      return qtd
    })

    onMounted(async () => {
      const filter = {
        companyID: { eq: props.company.id }
      }
      const papers: any = await API.graphql(
        graphqlOperation(listPapers, { filter })
      )

      companyPapers.values = papers.data.listPapers.items
    })

    return {
      alterar,
      price,
      changeCompany,
      soldAmount
    }
  }
})
</script>

<style lang="scss" scoped>
.card-container {
  padding: 15px;
  margin: 10px;
  border-radius: 7px;
  background: #2c2f33;
}
.card-title {
  font-size: 2rem;
  color: rgb(143, 143, 143);
  margin: 0 0 0.4rem 0;
}
.card-action {
  margin-top: 12px;
}
.buy-button {
  color: white;
  border: 2px solid #42b983;
  background: none;
  margin-left: 12px;

  &:hover {
    background: #42b983;
  }
}
.price {
  text-transform: uppercase;
}
</style>
