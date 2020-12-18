<template>
  <div class="card-container">
    <div class="card-title">
      <div class="company-code">{{ company.code }}</div>
      <div class="company-price">R$ {{ company.price.toFixed(2) }}</div>
    </div>
    <div class="company-name">{{ company.name }}</div>
    <div class="company-field">
      <span :style="{ marginRight: '18px' }">Código:</span>
      <div>
        <CustomInput
          :style="{ width: '100%' }"
          v-model="companyFields.code"
          @keydown.enter="changeCompany()"
          type="text"
          step="0.01"
        />
      </div>
    </div>
    <div class="company-field">
      <span :style="{ marginRight: '18px' }">Nome:</span>
      <div>
        <CustomInput
          :style="{ width: '100%' }"
          v-model="companyFields.name"
          @keydown.enter="changeCompany()"
          type="text"
          step="0.01"
        />
      </div>
    </div>
    <div class="company-field">
      <span :style="{ marginRight: '18px' }">Preço (R$):</span>
      <div>
        <CustomInput
          :style="{ width: '100%' }"
          v-model="companyFields.price"
          @keydown.enter="changeCompany()"
          type="number"
          step="0.01"
        />
      </div>
    </div>
    <div
      :style="{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '8px'
      }"
    >
      <CustomButton
        :style="{ border: '2px solid rgba(0,0,0,0)' }"
        @click="changeCompany()"
        >Salvar</CustomButton
      >
    </div>

    <!-- <div class="company-quantity-sold">
      Quantidade Vendida: {{ soldAmount }}
    </div> -->
  </div>
</template>
<script lang="ts">
import { API, graphqlOperation } from 'aws-amplify'
import { updateCompany } from '@/graphql/mutations'
import { defineComponent, computed, reactive } from 'vue'
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
    const companyFields = reactive({
      code: props.company.code,
      name: props.company.name,
      price: props.company.price
    })
    const companyPapers = reactive<
      { id: string; quantity: number; companyID: string; accountID: string }[]
    >([])

    const changeCompany = async () => {
      if (
        companyFields.price === '' ||
        !companyFields.price ||
        Number(companyFields.price) <= 0 ||
        (companyFields.name === props.company.name &&
          companyFields.code === props.company.code &&
          companyFields.price === props.company.price)
      ) {
        Number(companyFields.price) <= 0
          ? store.dispatch('setMessage', 'Preço deve ser maior que 0')
          : store.dispatch('setMessage', '')
        return
      }

      store.dispatch('setMessage', 'loading')

      const input = {
        id: props.company.id,
        name: companyFields.name,
        code: companyFields.code,
        price: companyFields.price
      }

      try {
        await API.graphql(graphqlOperation(updateCompany, { input }))
      } catch (error) {}

      store.dispatch('setMessage', 'Empresa alterada com sucesso!')
    }

    const soldAmount = computed(() => {
      let qtd = 0
      for (const paper of companyPapers) {
        qtd += paper.quantity
      }
      return qtd
    })

    return {
      companyFields,
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
.company-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
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
