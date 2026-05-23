<template>
  <div class="flex items-center justify-center gap-2 py-6">
    <!-- Prev -->
    <button
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="w-9 h-9 flex items-center justify-center rounded-xl border text-sm font-medium transition-all"
      :class="currentPage === 1 ? 'border-white/5 text-white/20 cursor-not-allowed' : 'border-white/10 text-white hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-400'"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
    </button>

    <!-- Pages -->
    <template v-for="page in pages" :key="page">
      <button
        v-if="page !== '...'"
        @click="$emit('change', page)"
        class="w-9 h-9 flex items-center justify-center rounded-xl border text-sm font-semibold transition-all"
        :class="page === currentPage ? 'bg-amber-400 border-amber-400 text-slate-900 shadow-lg shadow-amber-400/20' : 'border-white/10 text-white/60 hover:border-amber-400/40 hover:text-white'"
      >
        {{ page }}
      </button>
      <span v-else class="w-9 h-9 flex items-center justify-center text-white/20">…</span>
    </template>

    <!-- Next -->
    <button
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="w-9 h-9 flex items-center justify-center rounded-xl border text-sm font-medium transition-all"
      :class="currentPage === totalPages ? 'border-white/5 text-white/20 cursor-not-allowed' : 'border-white/10 text-white hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-400'"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 }
})
defineEmits(['change'])

const pages = computed(() => {
  const p = [], cur = props.currentPage, total = props.totalPages
  if (total <= 7) { for (let i = 1; i <= total; i++) p.push(i); return p }
  p.push(1)
  if (cur > 3) p.push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) p.push(i)
  if (cur < total - 2) p.push('...')
  p.push(total)
  return p
})
</script>