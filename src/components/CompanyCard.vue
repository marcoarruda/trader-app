<template>
  <div class="card-container">
    <div class="card-title">
      <div class="company-code">{{ company.code }}</div>
      <div v-if="!alterar" class="company-price" @click="alterar = !alterar">
        R$ {{ company.price }}
      </div>
      <CustomInput v-else v-model="price" @keydown.enter="changeCompany()" />
    </div>
    <div class="company-name">{{ company.name }}</div>
    <!-- <div class="company-quantity-sold">
      Quantidade Vendida: {{ soldAmount }}
    </div> -->
  </div>
</template>
<script lang="ts">
import { API, graphqlOperation } from 'aws-amplify'
import { updateCompany } from '@/graphql/mutations'
import { listPapers } from '@/graphql/queries'
import { defineComponent, ref, computed, onMounted, reactive } from 'vue'
import CustomInput from './CustomInput.vue'

export default defineComponent({
  name: 'CompanyCard',
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  components: {
    CustomInput
  },
  setup(props) {
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

      try {
        await API.graphql(graphqlOperation(updateCompany, { input }))
        alterar.value = false
      } catch (error) {}
    }

    const soldAmount = computed(() => {
      let qtd = 0
      for (const paper of companyPapers) {
        qtd += paper.quantity
      }
      return qtd
    })

    // onMounted(async () => {
    //   const filter = {
    //     companyID: { eq: props.company.id }
    //   }
    //   const papers: any = await API.graphql(
    //     graphqlOperation(listPapers, { filter })
    //   )

    //   console.log(papers)

    //   companyPapers.push(...papers.data.listPapers.items)

    //   console.log(companyPapers)
    // })

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
  padding: 12px;
  margin: 10px;
  border-radius: 7px;
  background: #2c2f33;
}
.card-title {
  display: flex;
  font-size: 2rem;
  margin: 0 0 0.4rem 0;
  justify-content: space-between;
  align-items: center;

  .company-code {
    color: rgb(143, 143, 143);
  }
  .company-price {
    font-size: 24px;
    font-weight: 200;
    cursor: pointer;
  }
}
.company-name {
  margin-bottom: 6px;
  font-weight: 300;
}
.company-quantity-sold {
  font-weight: 300;
  margin: 12px 0 auto 0;
  font-size: 12px;
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
