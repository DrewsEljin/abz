<template>
  <div class="user">
    <img class="user__img" :src="user.photo" alt="" />
    <div class="user__data" @mouseenter="$emit('show', user.name)" @mouseleave="$emit('hide')">
      {{ user.name }}
    </div>
    <div class="user__info">
      <div
        class="user__data"
        @mouseenter="$emit('show', user.position)"
        @mouseleave="$emit('hide')"
      >
        {{ user.position }}
      </div>
      <div class="user__data" @mouseenter="$emit('show', user.email)" @mouseleave="$emit('hide')">
        {{ user.email }}
      </div>
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
  min-width: 0;
  position: relative;
  &__data {
    width: 100%;
    max-width: fit-content;
    align-self: center;
    cursor: default;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }
  &__img {
    align-self: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    position: relative;
    // Placeholder for image
    &::after {
      content: '';
      position: absolute;
      width: 70px;
      height: 70px;
      background-image: url('@/assets/images/photo-cover.svg');
      left: 0;
      top: 0;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
  }
}
</style>
