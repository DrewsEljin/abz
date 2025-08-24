<template>
  <div v-if="isLoading" class="loader-overlay">
    <img class="spinner" src="@/assets/images/Preloader.svg" alt="loader" />
  </div>
</template>

<script setup lang="ts">
import { useLoader } from '@/composables/useLoader'
const { isLoading } = useLoader()
</script>

<style scoped lang="scss">
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
