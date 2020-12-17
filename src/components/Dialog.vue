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
            @click="registerCompany()"
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
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createCompany } from '@/graphql/mutations'
import { computed, defineComponent, reactive } from 'vue'
import CustomInput from './CustomInput.vue'
import CustomButton from './CustomButton.vue'

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
  setup() {
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

      const input = company
      await API.graphql(graphqlOperation(createCompany, { input }))
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
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #2c2f33;
  margin: 50% auto; /* 15% from the top and centered */
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 80%; /* Could be more or less, depending on screen size */
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
