<template>
  <div v-if="showDialog" class="modal">
    <div class="modal-content">
      <form @submit.prevent="registerCompany()">
        <CustomInput v-model="company.code" type="text" placeholder="Código" />
        <CustomInput
          v-model="company.name"
          type="text"
          placeholder="Nome da empresa"
        />
        <CustomInput
          v-model="company.price"
          type="number"
          step="0.01"
          placeholder="Preço"
        />
        <div class="actions">
          <CustomButton @click="$emit('close')">Cancelar</CustomButton>
          <CustomButton
            type="submit"
            :disabled="!validation"
            style="margin-left: 6px"
            >Lançar empresa</CustomButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { API, graphqlOperation } from 'aws-amplify'
import { createCompany } from '@/graphql/mutations'
import { computed, defineComponent, reactive } from 'vue'
import CustomInput from './CustomInput.vue'
import CustomButton from './CustomButton.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { CustomInput, CustomButton },
  name: 'Dialog',
  props: {
    showDialog: {
      type: Boolean,
      required: true,
      defaultValue: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    const company = reactive({
      code: '',
      name: '',
      price: ''
    })

    const validation = computed(() => {
      return company.code !== '' && company.name !== '' && company.price !== ''
    })

    const registerCompany = async () => {
      if (!validation.value) {
        return
      }
      store.dispatch('setMessage', 'loading')

      const input = company
      await API.graphql(graphqlOperation(createCompany, { input }))

      store.dispatch('setMessage', 'Empresa adicionada com sucesso!')
      emit('close')
    }

    return {
      company,
      registerCompany,
      validation
    }
  }
})
</script>

<style lang="scss" scoped>
/* Modal Content/Box */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 800; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #2c2f33;
  margin: 20% auto; /* 15% from the top and centered */

  @media (max-width: 700px) {
    margin: 50% auto;
  }

  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 300px; /* Could be more or less, depending on screen size */
  border-radius: 12px;
}

/* The Close Button */
.actions {
  margin-top: 12px;
}

input,
button {
  margin-top: 5px;
}
</style>
