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

    <router-link to="/signup">Cadastrar</router-link>
  </div>
</template>

<script lang="ts">
import { Auth } from 'aws-amplify'
import { defineComponent, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import router from '@/router'

export default defineComponent({
  name: 'Login',
  components: { CustomInput, CustomButton },
  setup() {
    const store = useStore()

    const userCredentials = reactive({
      email: '',
      password: ''
    })

    const signIn = async () => {
      try {
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
        console.log(error)
      } finally {
      }
    }

    return {
      userCredentials,
      signIn
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
