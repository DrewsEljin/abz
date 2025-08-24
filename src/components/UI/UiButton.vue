<template>
  <button class="btn" :disabled="disabled" :type="type">{{ text }}</button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ text: string; disabled?: boolean; type?: 'button' | 'submit' | 'reset' }>(),
  { type: 'button' },
)
</script>

<style scoped lang="scss">
.btn {
  background-color: $color-primary;
  border: 0;
  border-radius: 80px;
  min-width: 100px;
  padding: 4px 20px;
  cursor: pointer;
  font-size: 16px;
  line-height: 26px;
  font-family: inherit;
  transition: 0.3s ease;
  &:hover {
    background-color: #ffe302;
  }
  &:disabled {
    background-color: #b4b4b4;
    color: #fff;
    cursor: not-allowed;
  }
}
</style>
