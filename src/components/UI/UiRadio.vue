<template>
  <div class="radio-list">
    <div>Select your position</div>
    <label class="radio-wrapper" v-for="{ id, name } in items">
      <input type="radio" name="option" :value="id" v-model="value" />
      <span class="radio-dot"></span>
      {{ name }}
    </label>
  </div>
</template>

<script setup lang="ts">
import type { Position } from '@/types'
const value = defineModel('value')
defineProps<{ items: Position[] }>()
</script>

<style scoped lang="scss">
.radio-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-self: flex-start;
}
.radio-wrapper input[type='radio'] {
  display: none;
}
.radio-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.radio-dot {
  width: 20px;
  height: 20px;
  border: 1px solid #d0cfcf;
  border-radius: 50%;
  position: relative;
}
.radio-wrapper input[type='radio']:checked + .radio-dot {
  border-color: $color-secondary;
}
.radio-wrapper input[type='radio']:checked + .radio-dot::after {
  content: '';
  width: 10px;
  height: 10px;
  background-color: $color-secondary;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>
