<template>
  <div id="snackbar" :class="text !== '' ? 'show' : ''">
    <div v-if="text !== 'loading'">{{ text }}</div>
    <LoadingSpinner v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import LoadingSpinner from './LoadingSpinner.vue'
export default defineComponent({
  components: { LoadingSpinner },
  name: 'SnackBar',
  setup() {
    const store = useStore()

    const text = computed(() => store.getters.getMessage)

    watchEffect(() => {
      if (text.value !== '') {
        setTimeout(() => store.dispatch('setMessage', ''), 3000)
      }
    })

    return {
      text
    }
  }
})
</script>

<style lang="scss" scoped>
#snackbar {
  visibility: hidden;
  min-width: 300px;
  text-align: center;
  background-color: #333;
  color: #fff;
  border-radius: 8px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 30px;
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
