<template>
  <section class="hero container" fetchpriority="high">
    <div class="hero__content">
      <h1 class="hero__header">Test assignment for front-end developer</h1>
      <div class="hero__desc">
        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS
        with a vast understanding of User design thinking as they'll be building web interfaces with
        accessibility in mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </div>

      <picture>
        <source srcset="@/assets/images/hero.jpeg" media="(min-width: 992px)" />
        <source srcset="@/assets/images/hero.jpeg" media="(min-width: 768px)" />
        <source srcset="@/assets/images/hero.jpeg" media="(min-width: 0px)" />
        <img
          class="hero__img"
          src="@/assets/images/hero.jpeg"
          width="500"
          height="300"
          loading="eager"
          fetchpriority="high"
          alt="Main banner"
        />
      </picture>
      <a href="#register"> <UiButton text="Sign up" /></a>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiButton from '../UI/UiButton.vue'
</script>

<style scoped lang="scss">
.hero {
  height: 650px;
  position: relative;
  z-index: 1;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
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
  &__img {
    position: absolute;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    left: 0;
    top: 0;
  }
  // Blur for background image
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

@media (max-width: 1023px) {
  .hero {
    max-height: 500px;
  }
}
@media (max-width: 767px) {
  .hero {
    padding: 0 16px;
  }
}
</style>
