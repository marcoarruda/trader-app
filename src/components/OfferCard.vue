<template>
  <div class="card-container">
    <h1 class="card-title">
      <div class="company-code">{{ company.code }}</div>
      <div class="company-price">R$ {{ company.price }}</div>
    </h1>
    <h2 class="company-name">{{ company.name }}</h2>
    <div class="status" v-if="wallet && company.quantity > 0">
      Meu Total: R$ {{ company.total }} = {{ company.quantity }}x
    </div>
    <div class="total">Total Compra: R$ {{ total }}</div>
    <div class="card-action">
      <CustomInput
        v-model="qtd"
        type="text"
        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
        :max="maxBuy"
      />
      <CustomButton class="buy-button card-button" @click="buy()">
        Comprar
      </CustomButton>
    </div>
    <div class="total">Total Venda: R$ {{ totalSell }}</div>
    <div class="card-action" v-if="wallet && company.quantity > 0">
      <CustomInput
        v-model="qtdSell"
        type="text"
        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
      />
      <CustomButton class="sell-button card-button" @click="sell()">
        Vender
      </CustomButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getTransitionRawChildren, ref } from 'vue'
import CustomButton from './CustomButton.vue'
import CustomInput from './CustomInput.vue'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import {
  createPaper,
  updatePaper,
  updateAccount,
  deletePaper
} from '@/graphql/mutations'
import { getAccount } from '@/graphql/queries'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'OfferCard',
  components: { CustomInput, CustomButton },
  props: {
    company: {
      type: Object,
      required: true
    },
    wallet: {
      type: Boolean,
      defaultValue: false
    }
  },
  setup(props) {
    const store = useStore()
    const qtd = ref(0)
    const qtdSell = ref(0)
    const total = computed(() => props.company.price * qtd.value)
    const totalSell = computed(() => props.company.price * qtdSell.value)

    const buy = async () => {
      const account: any = await API.graphql(
        graphqlOperation(getAccount, {
          id: store.getters['market/getAccount'].id
        })
      )
      if (account.data.getAccount.balance >= total.value) {
        const input = {
          id: account.data.getAccount.id,
          balance: account.data.getAccount.balance - total.value,
          owner: account.data.getAccount.owner
        }
        await API.graphql(graphqlOperation(updateAccount, { input }))

        const paper = store.getters['market/getMyPapers'].find(
          (paper: any) => paper.companyID === props.company.id
        )
        if (paper) {
          const inputBuy = {
            id: paper.id,
            quantity: Number(qtd.value) + paper.quantity,
            companyID: props.company.id,
            accountID: store.getters['market/getAccount'].id
          }
          await API.graphql(graphqlOperation(updatePaper, { input: inputBuy }))
        } else {
          const inputBuy = {
            quantity: qtd.value,
            companyID: props.company.id,
            accountID: store.getters['market/getAccount'].id
          }

          await API.graphql(graphqlOperation(createPaper, { input: inputBuy }))
        }
        qtd.value = 0
      }
    }

    const sell = async () => {
      const account: any = await API.graphql(
        graphqlOperation(getAccount, {
          id: store.getters['market/getAccount'].id
        })
      )
      const paper = store.getters['market/getMyPapers'].find(
        (paper: any) => paper.companyID === props.company.id
      )
      if (qtdSell.value <= paper.quantity) {
        const input = {
          id: account.data.getAccount.id,
          balance: account.data.getAccount.balance + totalSell.value,
          owner: account.data.getAccount.owner
        }
        await API.graphql(graphqlOperation(updateAccount, { input }))

        if (paper.quantity - Number(qtdSell.value) === 0) {
          await API.graphql(
            graphqlOperation(deletePaper, { input: { id: paper.id } })
          )
        } else {
          const inputBuy = {
            id: paper.id,
            quantity: paper.quantity - Number(qtdSell.value),
            companyID: props.company.id,
            accountID: store.getters['market/getAccount'].id
          }
          await API.graphql(graphqlOperation(updatePaper, { input: inputBuy }))
        }

        qtdSell.value = 0
      }
    }

    const maxBuy = computed(() => {
      return Math.floor(
        store.getters['market/getAccount']?.balance / props.company.price
      )
    })

    return {
      qtd,
      qtdSell,
      buy,
      sell,
      maxBuy,
      logQtd() {
        console.log(qtd)
      },
      total,
      totalSell
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
.card-action {
  margin-top: 6px;
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
.company-name {
  margin-bottom: 6px;
  font-weight: 300;
}
.total {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
}
.sell-button {
  color: white;
  border: 2px solid #b94242;
  background: none;
  margin-left: 12px;

  &:hover {
    background: #b94242;
  }
}
</style>
