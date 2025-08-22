<template>
  <div :class="['input-wrapper', error && 'input-error']">
    <input :type="type" :id="id" placeholder=" " v-model="value" :autocomplete="type" />
    <label :for="id">{{ label }}</label>
    <div v-if="error" class="input-message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
const value = defineModel('value')

defineProps({
  label: String,
  type: String,
  error: Boolean,
  message: String,
  id: String,
})
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  & input {
    width: 100%;
    background-color: inherit;
    line-height: 26px;
    font-size: inherit;
    padding: 14px 16px;
    border-radius: 4px;
    border: 1px solid #d0cfcf;

    &:focus {
      outline: none;
    }
  }
  & label {
    position: absolute;
    left: 16px;
    top: 14px;
    color: #7e7e7e;
    z-index: 5;
    transition: 0.3s ease all;
  }

  & input:focus + label,
  input:not(:placeholder-shown) + label {
    font-size: 12px;
    left: 12px;
    overflow: auto;
    padding: 0 4px;
    background-color: #f8f8f8;
    top: -12px;
  }
  &.input-error {
    input {
      border-color: #cb3d40;
    }
    label {
      color: #cb3d40;
    }
  }
  & .input-message {
    position: absolute;
    font-size: 12px;
    color: #cb3d40;
  }
}
</style>
