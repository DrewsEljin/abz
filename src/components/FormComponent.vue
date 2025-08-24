<template>
  <h1 class="register__header">
    {{ !isSuccess ? 'Working with POST request' : 'User successfully registered' }}
  </h1>
  <form class="form" action="post" @submit.prevent="submitForm()" v-if="!isSuccess">
    <UiInput
      :type="'text'"
      :id="'name'"
      :label="'Your name'"
      v-model:value="v$.name.$model"
      :error="v$.name.$error"
      :messages="v$.name.$errors"
    />
    <UiInput
      :type="'email'"
      :id="'email'"
      :label="'Email'"
      v-model:value="v$.email.$model"
      :error="v$.email.$error"
      :messages="v$.email.$errors"
    />
    <UiInput
      :type="'tel'"
      :id="'phone'"
      :label="'Phone'"
      v-model:value="v$.phone.$model"
      :error="v$.phone.$error"
      :messages="v$.phone.$errors"
    />
    <UiRadio v-model:value="v$.position_id.$model" :items="positions" style="margin-top: -7px" />
    <UiUpload :error="v$.photo.$error" v-model:value="v$.photo.$model" />
    <UiButton text="Sign up" :disabled="v$.$invalid" type="submit" />
  </form>
  <img v-else src="@/assets/images/success-image.svg" alt="success" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { UiInput, UiRadio } from './UI'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength, maxLength } from '@vuelidate/validators'
import type { Position } from '@/types'
import { postRegister } from '@/http/api'
import UiButton from './UI/UiButton.vue'
import { useUsers } from '@/composables/useUsers'
import UiUpload from './UI/UiUpload.vue'

defineProps<{ positions: Position[] }>()
const isSuccess = ref(false)

const { loadUsers } = useUsers()

const emit = defineEmits(['submit'])
const form = reactive({
  name: '',
  email: '',
  phone: '',
  position_id: '1',
  photo: null as File | null,
})

const rules = {
  name: { required, minLength: minLength(2) },
  email: { required, email },
  phone: {
    required,
    startsWith: helpers.withMessage('Number must starts with +380', (value: string) =>
      value.startsWith('+380'),
    ),
    minLength: minLength(13),
    maxLength: maxLength(13),
  },
  position_id: { required },
  photo: { required },
}

const v$ = useVuelidate(rules, form)

const submitForm = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return
  try {
    await postRegister(form)
    await emit('submit')
    await loadUsers()
    const el = document.getElementById('users')
    el?.scrollIntoView({ behavior: 'smooth' })
    isSuccess.value = true
  } catch (e: any) {
    console.error(e.message)
  }
}
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  max-width: 380px;
  width: 100%;
}
</style>
