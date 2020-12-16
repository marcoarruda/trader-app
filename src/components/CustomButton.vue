<template>
  <button><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CustomButton'
})
</script>

<style lang="scss" scoped>
button {
  font-family: 'Roboto', sans-serif;
  border: none;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: 300;
  outline: none;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: rgba(#000000, 0.06);
  }
}
</style>
