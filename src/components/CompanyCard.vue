<template>
  <div class="card-container">
    <div class="card-title">
      <div class="company-code">{{ company.code }}</div>
      <div class="company-price">R$ {{ company.price }}</div>
    </div>
    <div class="company-name">{{ company.name }}</div>
    <span :style="{ marginRight: '18px' }">Preço (R$):</span>
    <CustomInput
      :style="{ width: '100px' }"
      v-model="price"
      @keydown.enter="changeCompany()"
      type="number"
      step="0.01"
    />
    <CustomButton
      :style="{ border: '2px solid rgba(0,0,0,0)', marginLeft: '8px' }"
      @click="changeCompany()"
      >Alterar</CustomButton
    >
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
import CustomButton from './CustomButton.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CompanyCard',
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  components: {
    CustomInput,
    CustomButton
  },
  setup(props) {
    const store = useStore()
    const alterar = ref(false)
    const price = ref(props.company.price)
    const companyPapers = reactive<
      { id: string; quantity: number; companyID: string; accountID: string }[]
    >([])

    const changeCompany = async () => {
      if (
        Number(price.value) === Number(props.company.price) ||
        price.value === '' ||
        !price.value
      ) {
        return
      }

      store.dispatch('setMessage', 'loading')
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

      store.dispatch('setMessage', 'Preço alterado com sucesso!')
    }

    const soldAmount = computed(() => {
      let qtd = 0
      for (const paper of companyPapers) {
        qtd += paper.quantity
      }
      return qtd
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
