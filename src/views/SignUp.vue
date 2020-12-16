<template>
  <div class="login-container">
    <h1>Cadastrar</h1>
    <form v-if="!confirm" @submit.prevent="signIn()">
      <CustomInput
        style="margin: 10px"
        v-model="userCredentials.name"
        type="text"
        placeholder="nome"
      />
      <CustomInput
        style="margin: 10px"
        v-model="userCredentials.email"
        type="text"
        placeholder="email"
      />
      <CustomInput
        style="margin: 10px"
        v-model="userCredentials.password"
        type="password"
        placeholder="senha"
      />
      <CustomButton class="login-button" @click="signUp()">Entrar</CustomButton>
      <router-link to="/login">Já tenho uma conta</router-link>
    </form>
    <form v-else @submit.prevent="confirmSignUp()">
      <CustomInput
        style="margin: 10px"
        v-model="userCredentials.code"
        type="text"
        placeholder="código"
      />
      <CustomButton class="login-button" @click="confirmSignUp()"
        >Entrar</CustomButton
      >
      <router-link to="/login">Já tenho uma conta</router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { Auth } from 'aws-amplify'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import store from '@/store/index'
import router from '@/router'
import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'

export default defineComponent({
  name: 'Login',
  components: { CustomInput, CustomButton },
  setup() {
    const confirm = ref(false)
    const userCredentials = reactive({
      name: '',
      email: '',
      password: '',
      code: ''
    })

    const signUp = async () => {
      try {
        const user = await Auth.signUp({
          username: userCredentials.email,
          password: userCredentials.password,
          attributes: {
            name: userCredentials.name,
            email: userCredentials.email
          }
        })
        confirm.value = true
        store.dispatch('setUser', user)
      } catch (error) {
        console.log(error)
      }
    }

    const confirmSignUp = async () => {
      try {
        await Auth.confirmSignUp(userCredentials.email, userCredentials.code)

        console.log(confirm)
        const user = await Auth.signIn({
          username: userCredentials.email,
          password: userCredentials.password
        })
        store.dispatch('setUser', user)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        store.dispatch('setUser', user)
      } catch (error) {
        console.log(error)
      }
    })

    return {
      confirm,
      userCredentials,
      signUp,
      confirmSignUp
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
    color: #333;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
