<template>
  <div class="tooltip-wrapper">
    <div v-if="visible" class="tooltip" :style="{ top: y + 'px', left: x + 'px' }">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({ text: String, visible: Boolean })

const x = ref(0)
const y = ref(0)

window.addEventListener('mousemove', onMouseMove)

function onMouseMove(event: MouseEvent) {
  updatePosition(event)
}

function updatePosition(event: MouseEvent) {
  x.value = event.pageX + 10
  y.value = event.pageY + 10
}
</script>

<style scoped lang="scss">
.tooltip-wrapper {
  display: contents;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  max-width: 100%;
}

.tooltip {
  position: absolute;
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  z-index: 1000;
  pointer-events: none;
  white-space: normal;
}
</style>
