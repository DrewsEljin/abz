<template>
  <main>
    <div class="container">
      <section class="hero">
        <div class="hero__content">
          <h1 class="hero__header">Test assignment for front-end developer</h1>
          <div class="hero__desc">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
            JS with a vast understanding of User design thinking as they'll be building web
            interfaces with accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </div>
          <a href="#register"> <UiButton text="Sign up" /></a>
        </div>
      </section>
    </div>
    <section class="users" id="users">
      <div class="users__container">
        <h1 class="users__header">Working with GET request</h1>
        <UserListComponent :users="users" :nextUrl="nextUrl" @more="moreUsers()" />
      </div>
    </section>
    <section class="register" id="register">
      <FormComponent :positions="positions" @submit="loadUsers()" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { User } from '@/types'
import { getPositios, getUsers, postRegister } from '@/http/api'
import UserListComponent from '@/components/UserListComponent.vue'
import FormComponent from '@/components/FormComponent.vue'
import UiButton from '@/components/UI/UiButton.vue'

const users = ref<User[]>([])
const positions = ref([])
const nextUrl = ref('https://frontend-test-assignment-api.abz.agency/api/v1/users')

onMounted(async () => {
  positions.value = await getPositios()
  await loadUsers()
})

// First load or reset
async function loadUsers() {
  try {
    const { users: newUsers, links } = await getUsers()
    users.value = newUsers
    nextUrl.value = links.next_url
  } catch (err) {
    console.error(err)
  }
}
// Show more users (by pages)
async function moreUsers() {
  try {
    if (nextUrl.value) {
      const { users: newUsers, links } = await getUsers(nextUrl.value)
      users.value.push(...newUsers)
      nextUrl.value = links.next_url
    }
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped lang="scss">
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
.users {
  padding: 140px 60px;
  &__container {
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
  &__header {
    margin: 0 auto;
  }
}
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-bottom: 100px;
  padding: 0 60px;
}

@media (max-width: 1023px) {
  .hero {
    max-height: 500px;
  }
  .register {
    padding: 0 32px;
  }
  .users {
    padding: 140px 32px;
  }
}
@media (max-width: 767px) {
  .hero,
  .register {
    padding: 0 16px;
  }
  .users {
    padding: 140px 16px;
  }
}
</style>
