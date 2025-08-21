<script setup lang="ts"></script>

<template>
  <div class="top-bar"></div>
  <header class="header">
    <div class="header__container">
      <RouterLink to="/"><img src="@/assets/images/Logo.svg" alt="logo" /></RouterLink>
      <div class="header__actions">
        <button class="btn">Users</button>
        <button class="btn">Sign up</button>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="hero">
        <div class="hero__content">
          <h1 class="hero__header">Test assignment for <br />front-end developer</h1>
          <div class="hero__desc">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
            JS with a vast understanding of User design thinking as they'll be building web
            interfaces with accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </div>
          <button class="btn">Sign up</button>
        </div>
      </div>
    </div>
  </main>
</template>

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
.hero {
  height: 650px;
  position: relative;
  background-image: url('/src/assets/images/hero.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 380px;
  }
  &__header {
    margin-bottom: 21px;
  }
  &__desc {
    margin-bottom: 32px;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: -1;
    opacity: 50%;
  }
}
</style>
