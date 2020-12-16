<template>
  <h1>Cadastrar</h1>
  <div v-if="!confirm">
    <input v-model="userCredentials.name" type="text" placeholder="nome" />
    <input v-model="userCredentials.email" type="text" placeholder="email" />
    <input
      v-model="userCredentials.password"
      type="password"
      placeholder="senha"
    />
    <button @click="signUp()">Entrar</button>
    <router-link to="/login">Já tenho uma conta</router-link>
  </div>
  <div v-else>
    <input v-model="userCredentials.code" type="text" placeholder="código" />
    <button @click="confirmSignUp()">Entrar</button>
    <router-link to="/login">Já tenho uma conta</router-link>
  </div>
</template>

<script lang="ts">
import { Auth } from 'aws-amplify'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import store from '@/store/index'
import router from '@/router'

export default defineComponent({
  name: 'Login',
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
