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
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}
</style>
