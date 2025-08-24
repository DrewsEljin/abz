<template>
  <div :class="['upload-wrapper', error && 'upload-error']">
    <input type="file" id="file" @change="handleUpload" ref="fileInputRef" accept=".jpg,.jpeg" />
    <label class="upload-btn" for="file">Upload</label>
    <span class="upload-name">{{ fileName ?? 'Upload your photo' }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const modelValue = defineModel<File | null>('value', { default: null })

const fileName = computed(() => modelValue.value?.name)

const props = defineProps<{ error: Boolean }>()
const fileInputRef = ref<HTMLInputElement | null>(null)

function handleUpload() {
  const file = fileInputRef.value?.files?.[0] ?? null
  if (!file) return

  if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
    alert('Only JPG/JPEG')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    alert(`Maximum allowed size is ${5} MB`)
    return
  }

  modelValue.value = file
}
</script>

<style scoped lang="scss">
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
