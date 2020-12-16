<template>
  <div class="card-container">
    <h1 class="card-title">{{ company.code }}</h1>
    <h2>{{ company.name }}</h2>
    <h3>Preço R$ {{ company.price }}</h3>
    <h3>Total: R$ {{ total }}</h3>
    <CustomInput
      v-model="qtd"
      type="text"
      oninput="this.value=this.value.replace(/[^0-9]/g,'');"
    />
    <CustomButton class="buy-button card-button" @click="logQtd()">
      Comprar
    </CustomButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import CustomButton from './CustomButton.vue'
import CustomInput from './CustomInput.vue'
export default defineComponent({
  name: 'OfferCard',
  components: { CustomInput, CustomButton },
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const qtd = ref(0)
    const total = ref()

    watchEffect(() => {
      total.value = props.company.price * qtd.value
    })

    const logQtd = () => {
      console.log(qtd.value)
    }

    return {
      qtd,
      logQtd,
      total
    }
  }
})
</script>

<style lang="scss" scoped>
.card-container {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  margin: 10px;
  border-radius: 7px;
}
.card-title {
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.2);
  margin: 0 0 0.4rem 0;
}
.buy-button {
  color: white;
  background-color: rgba(#388e3c, 1);
  transition: ease 0.4s;

  &:hover {
    background-color: rgba(#44ad4a, 1);
  }
}
</style>
