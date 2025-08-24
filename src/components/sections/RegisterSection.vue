<template>
  <section class="register" id="register">
    <FormComponent :positions="positions" @submit="loadUsers()" />
  </section>
</template>

<script setup lang="ts">
import { useUsers } from '@/composables/useUsers'
import FormComponent from '@/components/FormComponent.vue'
import { onMounted, ref } from 'vue'
import { getPositios } from '@/http/api'
const { loadUsers } = useUsers()
const positions = ref([])

onMounted(async () => {
  positions.value = await getPositios()
  await loadUsers()
})
</script>

<style scoped lang="scss">
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-bottom: 100px;
  padding: 0 60px;
}
@media (max-width: 1023px) {
  .register {
    padding: 0 32px;
  }
}
@media (max-width: 767px) {
  .register {
    padding: 0 16px;
  }
}
</style>
