<template>
  <section class="users" id="users">
    <div class="users__container">
      <h1 class="users__header">Working with GET request</h1>
      <UserListComponent :users="users" :nextUrl="nextUrl" @more="moreUsers()" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUsers } from '@/composables/useUsers'
import { onMounted } from 'vue'
import UserListComponent from '../UserListComponent.vue'

const { users, nextUrl, loadUsers, moreUsers } = useUsers()

onMounted(async () => {
  await loadUsers()
})
</script>

<style scoped lang="scss">
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
@media (max-width: 1023px) {
  .users {
    padding: 140px 32px;
  }
}
@media (max-width: 767px) {
  .users {
    padding: 140px 16px;
  }
}
</style>
