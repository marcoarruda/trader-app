<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="signIn()">
      <CustomInput
        v-model="userCredentials.email"
        type="text"
        placeholder="email"
        style="margin: 10px"
      />
      <CustomInput
        v-model="userCredentials.password"
        type="password"
        placeholder="senha"
        style="margin: 10px"
      />
      <CustomButton class="login-button">Entrar</CustomButton>
    </form>

    <div class="action-links">
      <router-link to="/signup">Cadastrar</router-link>
      <router-link to="/recover">Esqueci minha senha</router-link>
    </div>
    <LoadingSpinner v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Auth } from 'aws-amplify'
import { computed, defineComponent, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import router from '@/router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default defineComponent({
  name: 'Login',
  components: { CustomInput, CustomButton, LoadingSpinner },
  setup() {
    const store = useStore()

    const userCredentials = reactive({
      email: '',
      password: ''
    })

    const signIn = async () => {
      try {
        store.dispatch('setLoading', true)
        if (
          userCredentials.email.length === 0 ||
          userCredentials.password.length === 0
        ) {
          return
        }

        await store.dispatch('auth/loginAction', {
          username: userCredentials.email,
          password: userCredentials.password
        })
        router.push('/')
      } catch (error) {
        switch (error.code) {
          case 'UserNotFoundException':
            store.dispatch('setMessage', 'Usuário não encontrado')
            break
          case 'NotAuthorizedException':
            store.dispatch('setMessage', 'Email e/ou Senha incorretos')
            break
          default:
            store.dispatch(
              'setMessage',
              'Algo deu errado, tente novamente ou entre em contato conosco'
            )
            break
        }
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
      userCredentials,
      signIn,
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
.action-links {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  width: 100%;

  a {
    display: inline-block;
    margin: 0;
    padding: 0;

    &:first-child {
      width: 75px;
    }
    &:nth-child(2) {
      width: 140px;
    }
  }
}
</style>
