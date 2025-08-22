<template>
  <div class="user">
    <img class="user__img" :src="user.photo" alt="" />
    <div>{{ user.name }}</div>
    <div class="users__info">
      <div class="user__data">{{ user.position }}</div>
      <div class="user__data">{{ user.email }}</div>
      <div class="user__data">{{ user.phone }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types'
defineProps<{ user: User }>()
</script>

<style scoped lang="scss">
.user {
  background-color: #fff;
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  border-radius: 16px;
  text-align: center;
  align-items: stretch;
  min-width: 0;
  &__data {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__img {
    align-self: center;
    max-width: 70px;
    max-height: 70px;
    border-radius: 50%;
  }
  &__info {
    text-align: center;
  }
}
</style>
