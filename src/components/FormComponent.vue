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
    <div :class="['upload-wrapper', v$.photo.$error && 'upload-error']">
      <input type="file" id="file" @change="handleUpload" ref="fileInputRef" accept=".jpg,.jpeg" />
      <label class="upload-btn" for="file">Upload</label>
      <span class="upload-name">{{ v$.photo.$model?.name ?? 'Upload your photo' }}</span>
    </div>

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

defineProps<{ positions: Position[] }>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isSuccess = ref(false)
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
    emit('submit')
    isSuccess.value = true
  } catch (e: any) {
    console.error(e.message)
  }
}

function handleUpload() {
  const file = fileInputRef.value?.files?.[0] ?? null
  if (!file) {
    return
  }
  if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
    alert('Only JPG/JPEG')

    return
  }
  if (file.size > 5 * 1024 * 1024) {
    alert(`Maximum allowed size is ${5} MB`)
    return
  }

  form.photo = fileInputRef.value?.files?.[0] ?? null
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

.upload-wrapper {
  display: flex;
  align-self: flex-start;
  width: 100%;
  line-height: 26px;
  & input[type='file'] {
    display: none;
  }
}
.upload-btn {
  padding: 13px 15px;
  border: 1px solid #000;
  border-radius: 4px 0 0 4px;
  text-align: center;
  cursor: pointer;
}
.upload-name {
  padding: 13px 15px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #7e7e7e;
  border: 1px solid #d0cfcf;
  border-left: 0;
  border-radius: 0 4px 4px 0;
}
// Error styles
.upload-error .upload-btn,
.upload-error .upload-name {
  border-color: #cb3d40;
  border-width: 2px;
}
</style>
