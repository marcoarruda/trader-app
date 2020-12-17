<template>
  <div class="nav">
    <div class="nav-links">
      <router-link to="/">Carteira</router-link>
      <router-link to="/market">Mercado</router-link>
      <router-link to="/admin">Admin</router-link>
    </div>
    <div class="user-action">
      <CustomButton @click="logout()">Sair</CustomButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Auth } from 'aws-amplify'
import router from '@/router'
import CustomButton from '@/components/CustomButton.vue'

export default defineComponent({
  name: 'Header',
  components: { CustomButton },
  setup() {
    const store = useStore()
    const logout = async () => {
      await Auth.signOut()
      store.dispatch('auth/setUser', null)
      router.push('/login')
    }

    return {
      logout,
      user: computed(() => store.getters.getUser)
    }
  }
})
</script>

<style lang="scss" scoped>
.nav {
  padding: 20px 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 500;
  background: #2c2f33;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    font-weight: bold;
    color: #8d919e;
    margin: 0 10px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  // .nav-links {
  //   margin-left: auto;
  // }

  .user-action {
    margin-left: auto;
  }
}
</style>
