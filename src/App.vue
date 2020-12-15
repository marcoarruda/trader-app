<template>
  <Header />
  <div class="container"><router-view /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Header from '@/components/Header.vue'

export default defineComponent({
  components: { Header },
  name: 'App'
})
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
body,
root {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin-top: 85px;
  padding: 5px 15px;
  overflow: hidden;
}
</style>
