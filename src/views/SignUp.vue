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
      <CustomButton class="login-button" type="submit" :disabled="loading"
        >Cadastrar</CustomButton
      >
    </form>
    <form v-else @submit.prevent="confirmSignUp()">
      <CustomInput
        style="margin: 10px"
        v-model="userCredentials.code"
        type="text"
        placeholder="código"
      />
      <CustomButton class="login-button" type="submit" :disabled="loading"
        >Entrar</CustomButton
      >
    </form>
    <router-link to="/login">Já tenho uma conta</router-link>
    <LoadingSpinner v-if="loading" />
  </div>
</template>

<script lang="ts">
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createAccount } from '../graphql/mutations'
import { listAccounts } from '../graphql/queries'
import { defineComponent, onMounted, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default defineComponent({
  name: 'Login',
  components: { CustomInput, CustomButton, LoadingSpinner },
  setup() {
    const store = useStore()
    const confirm = ref(false)
    const userCredentials = reactive({
      name: '',
      email: '',
      password: '',
      code: ''
    })

    const signUp = async () => {
      try {
        store.dispatch('setLoading', true)
        const user = await Auth.signUp({
          username: userCredentials.email,
          password: userCredentials.password,
          attributes: {
            name: userCredentials.name,
            email: userCredentials.email
          }
        })
        confirm.value = true
        store.dispatch('auth/setUser', user)
      } catch (error) {
        console.log(error)
      } finally {
        store.dispatch('setLoading', false)
      }
    }

    const confirmSignUp = async () => {
      try {
        store.dispatch('setLoading', true)
        await Auth.confirmSignUp(userCredentials.email, userCredentials.code)

        await store.dispatch('auth/loginAction', {
          username: userCredentials.email,
          password: userCredentials.password
        })
        router.push('/')
      } catch (error) {
        // console.log(error)
      } finally {
        store.dispatch('setLoading', false)
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
      signUp,
      confirmSignUp,
      loading: computed(() => store.getters.getLoading)
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
