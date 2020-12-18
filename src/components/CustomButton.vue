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
  background: #363636;
  transition: all linear 0.2s;

  &:hover {
    background: #414141;

    &:disabled {
      background-color: grey !important;
      color: black !important;
      cursor: default !important;
      border: none !important;
    }
  }

  &:disabled {
    background-color: grey !important;
    color: black !important;
    cursor: default !important;
    border: none !important;
  }
}
</style>
