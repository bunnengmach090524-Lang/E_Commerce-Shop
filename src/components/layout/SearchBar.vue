<template>
  <div class="flex-1 max-w-2xl relative group">
    <div class="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden focus-within:border-amber-400/60 focus-within:bg-white/15 focus-within:shadow-lg focus-within:shadow-amber-400/10 transition-all duration-300">
      <!-- Category dropdown -->
      <select
        v-model="selectedCategory"
        class="hidden md:block bg-transparent text-white/70 text-xs font-medium px-3 py-3 outline-none cursor-pointer border-r border-white/20 hover:text-amber-400 transition-colors"
      >
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home">Home</option>
        <option value="beauty">Beauty</option>
        <option value="sports">Sports</option>
        <option value="books">Books</option>
      </select>

      <!-- Input -->
      <input
        v-model="query"
        @keyup.enter="handleSearch"
        @input="handleInput"
        type="text"
        placeholder="Search for products, brands and more..."
        class="flex-1 bg-transparent text-white placeholder-white/40 text-sm px-4 py-3 outline-none min-w-0"
      />

      <!-- Search button -->
      <button
        @click="handleSearch"
        class="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 transition-all duration-200 hover:shadow-md flex items-center gap-1.5 font-semibold text-sm flex-shrink-0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span class="hidden lg:block">Search</span>
      </button>
    </div>

    <!-- Search suggestions dropdown -->
    <div
      v-if="showSuggestions && suggestions.length"
      class="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
    >
      <div class="p-2">
        <p class="text-white/40 text-xs px-3 py-1.5 font-medium uppercase tracking-wider">Suggestions</p>
        <button
          v-for="s in suggestions"
          :key="s"
          @click="selectSuggestion(s)"
          class="w-full text-left px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-xl transition-colors flex items-center gap-2"
        >
          <svg class="w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          {{ s }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const selectedCategory = ref('')
const showSuggestions = ref(false)

const allSuggestions = [
  'iPhone 15', 'Samsung Galaxy', 'Nike shoes', 'Laptop under $500',
  'Wireless headphones', 'Coffee maker', 'Running shoes', 'Smart watch',
  'Gaming chair', 'Bluetooth speaker', 'Yoga mat', 'Air fryer'
]

const suggestions = computed(() => {
  if (!query.value || query.value.length < 2) return []
  return allSuggestions.filter(s => s.toLowerCase().includes(query.value.toLowerCase())).slice(0, 6)
})

function handleInput() {
  showSuggestions.value = query.value.length >= 2
}

function handleSearch() {
  if (query.value.trim()) {
    showSuggestions.value = false
    router.push({ path: '/shop', query: { q: query.value, category: selectedCategory.value } })
  }
}

function selectSuggestion(s) {
  query.value = s
  showSuggestions.value = false
  handleSearch()
}
</script>