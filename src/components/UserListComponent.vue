<template>
  <UiTooltip :visible="tooltipVisible" :text="tooltipText" />
  <div class="users-list">
    <UserComponent
      v-for="user in sortedUsers"
      :user="user"
      :key="user.id"
      @show="(text: string) => showTooltip(text)"
      @hide="tooltipVisible = false"
    />
  </div>
  <UiButton v-if="nextUrl" text="Show more" @click="$emit('more')" />
</template>

<script setup lang="ts">
import type { User } from '@/types'
import { computed, ref } from 'vue'
import UserComponent from './UserComponent.vue'
import { UiTooltip, UiButton } from './UI'

const props = defineProps<{ users: User[]; nextUrl: string }>()

const tooltipVisible = ref(false)
const tooltipText = ref('')

const sortedUsers = computed(() => {
  return props.users.sort((a, b) => {
    return b.timestamp - a.timestamp
  })
})

function showTooltip(text = '') {
  tooltipVisible.value = true
  tooltipText.value = text
}
</script>

<style scoped>
.users-list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 29px;
}

@media (max-width: 1023px) {
  .users-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}
@media (max-width: 767px) {
  .users-list {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }
}
</style>
