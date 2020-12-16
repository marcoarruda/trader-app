<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/market">Mercado</router-link>
    <button @click="logout()">Sair</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Auth } from 'aws-amplify'
import router from '@/router'

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useStore()
    const logout = async () => {
      await Auth.signOut()
      store.dispatch('setUser', null)
      router.push('/login')
    }

    return {
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 500;
  background: white;
  display: flex;
  justify-content: center;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 10px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
