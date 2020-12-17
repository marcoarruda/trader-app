<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CustomInput',
  props: ['modelValue']
})
</script>

<style lang="scss" scoped>
input {
  border: none;
  padding: 10px 15px;
  width: auto;
  outline: none;
  border-radius: 7px;
  background-color: #3e4144;
  transition: ease 0.2s;
  border: 2px solid rgba(#000000, 0);

  &:hover,
  &:active,
  &:focus {
    border: 2px solid rgb(218, 218, 218);
  }
}
</style>
