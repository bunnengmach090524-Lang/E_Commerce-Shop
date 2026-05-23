<template>
  <div class="relative">
    <input
      v-model="query"
      @keyup.enter="$emit('search', query)"
      type="text"
      placeholder="Search products..."
      class="w-full px-4 py-2.5 pl-10 bg-slate-800/60 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm outline-none focus:border-amber-400/40 transition-all"
    />
    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <button v-if="query" @click="query = ''; $emit('search', '')" class="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineEmits(['search'])
const query = ref('')
</script>