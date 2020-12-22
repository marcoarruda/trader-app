<template>
  <div class="card-container">
    <div class="card-title">
      <div class="company-code">{{ company.code }}</div>
      <div
        :class="{
          'company-price': true,
          'price-up': company.trending === 'up',
          'price-down': company.trending === 'down'
        }"
      >
        <EqualsIcon
          v-if="!company.trending"
          :style="{ width: '30px', height: '30px' }"
        />
        <TrendingUpIcon
          v-if="company.trending && company.trending === 'up'"
          :style="{ width: '30px', height: '30px' }"
        />
        <TrendingDownIcon
          v-if="company.trending && company.trending === 'down'"
          :style="{ width: '30px', height: '30px' }"
        />
        <div style="margin-left: 5px">
          {{ numeral(company.price).format('$ 0,0.00') }}
        </div>
      </div>
    </div>
    <h2 class="company-name">{{ company.name }}</h2>
    <div class="status" v-if="wallet && company.quantity > 0">
      Meu Total: {{ numeral(company.total).format('$ 0,0.00') }} =
      {{ company.quantity }}x
    </div>
    <div class="total">
      Total Compra: {{ numeral(total).format('$ 0,0.00') }}
    </div>
    <div class="card-action">
      <CustomInput
        v-model="qtd"
        type="text"
        placeholder="quantidade"
        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
        :max="maxBuy"
      />
      <CustomButton class="buy-button card-button" @click="buy()">
        Comprar
      </CustomButton>
    </div>
    <div class="total" v-if="wallet">
      Total Venda: {{ numeral(totalSell).format('$ 0,0.00') }}
    </div>
    <div class="card-action" v-if="wallet && company.quantity > 0">
      <CustomInput
        v-model="qtdSell"
        type="text"
        placeholder="quantidade"
        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
      />
      <CustomButton class="sell-button card-button" @click="sell()">
        Vender
      </CustomButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import CustomButton from './CustomButton.vue'
import CustomInput from './CustomInput.vue'
import TrendingUpIcon from './TrendingUpIcon.vue'
import TrendingDownIcon from './TrendingDownIcon.vue'
import EqualsIcon from './EqualsIcon.vue'
import { API, graphqlOperation } from 'aws-amplify'
import {
  createPaper,
  updatePaper,
  updateAccount,
  deletePaper
} from '@/graphql/mutations'
import { getAccount } from '@/graphql/queries'
import { useStore } from 'vuex'
import numeral from 'numeral'

export default defineComponent({
  name: 'OfferCard',
  components: {
    CustomInput,
    CustomButton,
    TrendingUpIcon,
    TrendingDownIcon,
    EqualsIcon
  },
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
    const qtd = ref()
    const qtdSell = ref()
    const total = computed(() => props.company.price * qtd.value || 0)
    const totalSell = computed(() => props.company.price * qtdSell.value || 0)

    const buy = async () => {
      if (!qtd.value || qtd.value === '' || qtd.value < 1) {
        const msg =
          !qtd.value || qtd.value === ''
            ? 'Digite uma quantidade para realizar a compra!'
            : 'Quantidade deve ser maior que 0'
        store.dispatch('setMessage', msg)
        return
      }

      store.dispatch('setLoading', true)

      const account: any = await API.graphql({
        query: getAccount,
        variables: {
          id: store.getters['market/getAccount'].id
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })

      if (account.data.getAccount.balance >= total.value) {
        store.dispatch('setMessage', 'loading')

        const input = {
          id: account.data.getAccount.id,
          balance: account.data.getAccount.balance - total.value,
          owner: account.data.getAccount.owner
        }

        await API.graphql({
          query: updateAccount,
          variables: {
            input
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        })

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
          const response: any = await API.graphql(
            graphqlOperation(updatePaper, { input: inputBuy })
          )

          store.dispatch(
            'market/setMyPapers',
            store.getters['market/getMyPapers'].map((paper: any) => {
              if (paper.id === response.data.updatePaper.id) {
                return { ...paper, ...response.data.updatePaper }
              } else {
                return paper
              }
            })
          )
          store.dispatch('market/setAccount', {
            ...account.data.getAccount,
            balance: account.data.getAccount.balance - total.value
          })
        } else {
          const inputBuy = {
            quantity: qtd.value,
            companyID: props.company.id,
            accountID: store.getters['market/getAccount'].id
          }

          const response: any = await API.graphql(
            graphqlOperation(createPaper, { input: inputBuy })
          )
          store.dispatch('market/setMyPapers', [
            ...store.getters['market/getMyPapers'],
            response.data.createPaper
          ])
          store.dispatch('market/setAccount', {
            ...account.data.getAccount,
            balance: account.data.getAccount.balance - total.value
          })
        }
        store.dispatch('setMessage', 'Compra realizada com sucesso!')
        qtd.value = null
      } else {
        store.dispatch('setMessage', 'Saldo insuficiente para essa operação!')
      }

      store.dispatch('setLoading', false)
    }

    const sell = async () => {
      if (!qtdSell.value || qtdSell.value === '' || qtdSell.value < 1) {
        const msg =
          !qtd.value || qtd.value === ''
            ? 'Digite uma quantidade para realizar a venda!'
            : 'Quantidade deve ser maior que 0'
        store.dispatch('setMessage', msg)
        return
      }

      store.dispatch('setLoading', true)

      const account: any = await API.graphql({
        query: getAccount,
        variables: {
          id: store.getters['market/getAccount'].id
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })
      const paper = store.getters['market/getMyPapers'].find(
        (paper: any) => paper.companyID === props.company.id
      )
      if (qtdSell.value <= paper.quantity) {
        store.dispatch('setMessage', 'loading')

        const input = {
          id: account.data.getAccount.id,
          balance: account.data.getAccount.balance + totalSell.value,
          owner: account.data.getAccount.owner
        }
        // await API.graphql(graphqlOperation(updateAccount, { input }))

        await API.graphql({
          query: updateAccount,
          variables: {
            input
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        })

        if (paper.quantity - Number(qtdSell.value) === 0) {
          await API.graphql(
            graphqlOperation(deletePaper, { input: { id: paper.id } })
          )

          store.dispatch(
            'market/setMyPapers',
            store.getters['market/getMyPapers'].filter(
              (paperOld: any) => paperOld.id !== paper.id
            )
          )
          store.dispatch('market/setAccount', {
            ...account.data.getAccount,
            balance: account.data.getAccount.balance + totalSell.value
          })
        } else {
          const inputBuy = {
            id: paper.id,
            quantity: paper.quantity - Number(qtdSell.value),
            companyID: props.company.id,
            accountID: store.getters['market/getAccount'].id
          }
          const response: any = await API.graphql(
            graphqlOperation(updatePaper, { input: inputBuy })
          )
          store.dispatch(
            'market/setMyPapers',
            store.getters['market/getMyPapers'].map((paper: any) => {
              if (paper.id === response.data.updatePaper.id) {
                return { ...paper, ...response.data.updatePaper }
              } else {
                return paper
              }
            })
          )
          store.dispatch('market/setAccount', {
            ...account.data.getAccount,
            balance: account.data.getAccount.balance + totalSell.value
          })
        }

        store.dispatch('setMessage', 'Venda realizada com sucesso!')
        qtdSell.value = null
      } else {
        store.dispatch(
          'setMessage',
          'Quantidade insuficiente para essa operação!'
        )
      }

      store.dispatch('setLoading', false)
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
      total,
      totalSell,
      numeral
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
  color: #fff;
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
    align-items: center;
    display: flex;
  }
}

.price-up {
  color: #42b983 !important;
}
.price-down {
  color: #b94242 !important;
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
  margin-top: 12px;
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
