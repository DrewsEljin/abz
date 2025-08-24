<template>
  <HeaderComponent />
  <RouterView />
  <Loader />
</template>

<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import Loader from './components/Loader.vue'
</script>

<style scoped lang="scss"></style>
