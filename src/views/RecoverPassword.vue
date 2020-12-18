<template>
  <div class="login-container">
    <h1>Recuperar Senha</h1>
    <form v-if="!confirm" @submit.prevent="forgotPassword()">
      <CustomInput
        style="margin: 10px"
        v-model="userCredentials.email"
        type="text"
        placeholder="email"
      />
      <CustomButton class="login-button" type="submit"
        >Enviar Código</CustomButton
      >
    </form>
    <form v-else @submit.prevent="changePassword()">
      <CustomInput
        style="margin: 10px"
        v-model="userCredentials.password"
        type="password"
        placeholder="senha"
      />
      <CustomInput
        style="margin: 10px"
        v-model="userCredentials.code"
        type="text"
        placeholder="código"
      />
      <CustomButton class="login-button" type="submit"
        >Alterar Senha</CustomButton
      >
    </form>
    <router-link to="/login">Lembrei minha senha</router-link>
  </div>
</template>

<script lang="ts">
import { Auth } from 'aws-amplify'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'

export default defineComponent({
  name: 'RecoverPassword',
  components: { CustomInput, CustomButton },
  setup() {
    const store = useStore()
    const confirm = ref(false)
    const userCredentials = reactive({
      name: '',
      email: '',
      password: '',
      code: ''
    })

    const forgotPassword = async () => {
      try {
        await Auth.forgotPassword(userCredentials.email)
        confirm.value = true
      } catch (error) {
        console.log(error)
      }
    }

    const changePassword = async () => {
      try {
        await Auth.forgotPasswordSubmit(
          userCredentials.email,
          userCredentials.code,
          userCredentials.password
        )
        router.push('/login')
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        store.dispatch('auth/setUser', user)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    })

    return {
      confirm,
      userCredentials,
      forgotPassword,
      changePassword
    }
  }
})
</script>
<style lang="scss" scoped>
.login-container {
  margin-top: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    text-align: center;
    margin-bottom: 15px;
  }

  input,
  button {
    width: 300px;
    margin: 5px !important;
  }

  a {
    margin: 8px;
    padding: 0;
    width: 100%;
    text-align: center;
    text-decoration: none;
    color: rgb(105, 105, 105);
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
