<template>
  <Header />
  <div class="container"><router-view /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Header from '@/components/Header.vue'

document.title = 'Trader App'

export default defineComponent({
  components: { Header },
  name: 'App'
})
</script>

<style lang="scss">
*,
body,
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin-top: 85px;
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 85px);
}
</style>
