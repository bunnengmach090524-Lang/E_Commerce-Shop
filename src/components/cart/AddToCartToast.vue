<template>
  <Transition name="toast">
    <div
      v-if="visible"
      class="fixed top-20 right-6 z-[9500] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center gap-4 max-w-[340px] w-full"
    >
      <!-- Green check -->
      <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
      </div>

      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold text-gray-900">Added to Cart!</p>
        <p class="text-xs text-gray-500 mt-0.5 truncate">{{ product?.title || product?.name }}</p>
      </div>

      <button
        @click="visible = false"
        class="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Progress bar -->
      <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100 rounded-b-2xl overflow-hidden">
        <div class="h-full bg-green-400 toast-progress"/>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ product: Object })
const visible = ref(false)

watch(() => props.product, (val) => {
  if (val) {
    visible.value = true
    setTimeout(() => { visible.value = false }, 3000)
  }
})
</script>

<style scoped>
.toast-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.25s ease-in; }
.toast-enter-from { opacity: 0; transform: translateX(100%) scale(0.9); }
.toast-leave-to { opacity: 0; transform: translateX(60px) scale(0.95); }

.toast-progress {
  animation: shrink 3s linear forwards;
}
@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}
</style>