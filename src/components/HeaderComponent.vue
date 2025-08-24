<template>
  <div class="top-bar"></div>
  <header class="header">
    <div class="header__container">
      <RouterLink to="/"><img src="@/assets/images/Logo.svg" alt="logo" /></RouterLink>
      <div class="header__actions">
        <a href="#users"> <UiButton text="Users" /> </a>
        <a href="#register"> <UiButton text="Sign up" /> </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { UiButton } from './UI'
</script>

<style scoped lang="scss">
.top-bar {
  width: 100%;
  height: 60px;
  background-color: #161616;
}
.header {
  padding: 13px 60px;
  background-color: #fff;
  &__container {
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  &__actions {
    display: flex;
    gap: 10px;
  }
}

@media (max-width: 1023px) {
  .header {
    padding: 13px 32px;
  }
}

@media (max-width: 767px) {
  .header {
    padding: 13px 16px;
  }
}
</style>
