<template>
  <HeaderComponent />
  <main>
    <div class="container">
      <div class="hero">
        <div class="hero__content">
          <h1 class="hero__header">Test assignment for front-end developer</h1>
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
    <div class="users">
      <div class="users__container">
        <h1 class="users__header">Working with GET request</h1>
        <div class="users__list">
          <UserComponent v-for="user in sortedUsers" :user="user" :key="user.id" />
        </div>
        <button v-if="isNextUrl" class="btn" @click="loadUsers()">Show more</button>
      </div>
    </div>
    <div class="register">
      <h1 class="register__header">Working with POST request</h1>
      <form class="register__form" action="post" @submit.prevent="submitForm()">
        <UiInput
          :type="'text'"
          :id="'name'"
          :label="'Your name'"
          v-model:value="form.name"
          :error="v$.name.$error"
          :message="v$.name.required.$message"
        />
        <UiInput
          :type="'email'"
          :id="'email'"
          :label="'Email'"
          v-model:value="form.email"
          :error="v$.email.$error"
          :message="v$.name.required.$message"
        />
        <UiInput
          :type="'phone'"
          :id="'phone'"
          :label="'Phone'"
          v-model:value="form.phone"
          :error="v$.phone.$error"
          :message="v$.phone.required.$message"
        />
        <UiRadio v-model:value="form.position_id" :items="positions" />
        <div class="upload-wrapper">
          <input type="file" id="file" @change="handleUpload" ref="fileInputRef" />
          <label class="upload-btn" for="file">Upload</label>
          <span class="upload-name">{{ form.photo?.name ?? 'Upload your photo' }}</span>
        </div>

        <button type="submit" class="btn">Sign up</button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, h, onMounted, reactive, ref } from 'vue'
import { http } from './http/http'
import UiInput from './components/UI/UiInput.vue'
import UiRadio from './components/UI/UiRadio.vue'
import UserComponent from './components/UserComponent.vue'
import type { User } from '@/types'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import HeaderComponent from './components/HeaderComponent.vue'

const users = ref<User[]>([])
const positions = ref([])
const page = ref(1)
const isNextUrl = ref(true)
const fileInputRef = ref<HTMLInputElement | null>(null)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  position_id: 1,
  photo: null as File | null,
})

const startsWith380 = helpers.withMessage('Телефон должен начинаться с +380', (value: string) =>
  value.startsWith('+380'),
)
const rules = {
  name: { required },
  email: { required, email },
  phone: { required, startsWith380 },
}

const v$ = useVuelidate(rules, form)

const submitForm = () => {
  v$.value.$touch()
  if (v$.value.$invalid) return
  console.log('Form submitted', form)
}

onMounted(async () => {
  await loadUsers()
  await laodPositions()
})

function handleUpload() {
  form.photo = fileInputRef.value?.files?.[0] ?? null
}

const sortedUsers = computed(() => {
  return users.value.sort((a, b) => {
    return b.timestamp - a.timestamp
  })
})

async function laodPositions() {
  try {
    const { data } = await http.get('/positions')
    positions.value = data.positions
  } catch (err) {
    console.log(err)
  }
}

async function loadUsers() {
  try {
    if (isNextUrl.value) {
      const { data } = await http.get(`/users?page=${page.value}&count=6`)
      users.value.push(...data.users)
      isNextUrl.value = data.links.next_url
      page.value++
    }
  } catch (err) {
    console.error(err)
  }
}
</script>

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
  &__list {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 29px;
  }
}
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-bottom: 100px;
  padding: 0 60px;
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    max-width: 380px;
    width: 100%;
  }
  &__input {
    width: 100%;
    &::placeholder {
      color: #7e7e7e;
    }
  }
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
  padding: 14px 15px;
  border: 1px solid #000;
  border-radius: 4px 0 0 4px;
  text-align: center;
  cursor: pointer;
}
.upload-name {
  padding: 14px 15px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border: 1px solid #d0cfcf;
  border-left: 0;
  border-radius: 0 4px 4px 0;
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
    &__list {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }
}
@media (max-width: 767px) {
  .hero,
  .register {
    padding: 0 16px;
  }
  .users {
    padding: 140px 16px;
    &__list {
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
    }
  }
}
</style>
