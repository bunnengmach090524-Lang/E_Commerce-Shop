<template>
  <!-- Mobile toggle -->
  <button
    @click="open = !open"
    class="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-slate-800/60 border border-white/10 rounded-2xl text-white text-sm font-semibold mb-3"
  >
    <span class="flex items-center gap-2">
      <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18M7 12h10M11 18h2"/></svg>
      Filters
      <span v-if="activeCount" class="bg-amber-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{{ activeCount }}</span>
    </span>
    <svg class="w-4 h-4 transition-transform" :class="open ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
  </button>

  <div :class="['lg:block', open ? 'block' : 'hidden']">
    <div class="bg-slate-800/60 backdrop-blur-sm border border-white/5 rounded-2xl p-4 space-y-5">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h3 class="text-white font-bold text-sm">Filters</h3>
        <button @click="clearAll" class="text-amber-400 text-xs font-semibold hover:text-amber-300 transition-colors">Clear all</button>
      </div>

      <!-- Category -->
      <div>
        <h4 class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2.5">Category</h4>
        <div class="space-y-1">
          <label
            v-for="cat in categories"
            :key="cat.value"
            class="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              @click="toggleCategory(cat.value)"
              class="w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-all"
              :class="selectedCategories.includes(cat.value) ? 'bg-amber-400 border-amber-400' : 'border-white/20 group-hover:border-amber-400/50'"
            >
              <svg v-if="selectedCategories.includes(cat.value)" class="w-2.5 h-2.5 text-slate-900" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <span class="text-white/60 text-xs group-hover:text-white transition-colors flex-1">{{ cat.label }}</span>
            <span class="text-white/20 text-[10px]">{{ cat.count }}</span>
          </label>
        </div>
      </div>

      <!-- Price Range -->
      <div>
        <h4 class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2.5">Price Range</h4>
        <div class="space-y-1">
          <label v-for="range in priceRanges" :key="range.value" class="flex items-center gap-2.5 cursor-pointer group">
            <input type="radio" name="price" :value="range.value" v-model="selectedPrice" class="accent-amber-400" />
            <span class="text-white/60 text-xs group-hover:text-white transition-colors">{{ range.label }}</span>
          </label>
        </div>
      </div>

      <!-- Rating -->
      <div>
        <h4 class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2.5">Min Rating</h4>
        <div class="space-y-1">
          <label v-for="r in [4, 3, 2]" :key="r" class="flex items-center gap-2 cursor-pointer group">
            <input type="radio" name="rating" :value="r" v-model="selectedRating" class="accent-amber-400" />
            <div class="flex gap-0.5">
              <svg v-for="s in 5" :key="s" class="w-3 h-3" :class="s <= r ? 'text-amber-400' : 'text-white/15'" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <span class="text-white/50 text-xs">& up</span>
          </label>
        </div>
      </div>

      <!-- Apply button -->
      <button @click="applyFilters" class="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-400/20">
        Apply Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['filter'])
const open = ref(false)

const selectedCategories = ref([])
const selectedPrice = ref('')
const selectedRating = ref(0)

const activeCount = computed(() => {
  let c = selectedCategories.value.length
  if (selectedPrice.value) c++
  if (selectedRating.value) c++
  return c
})

function toggleCategory(val) {
  const idx = selectedCategories.value.indexOf(val)
  if (idx > -1) selectedCategories.value.splice(idx, 1)
  else selectedCategories.value.push(val)
}

function clearAll() {
  selectedCategories.value = []
  selectedPrice.value = ''
  selectedRating.value = 0
  emit('filter', {})
}

function applyFilters() {
  emit('filter', {
    categories: selectedCategories.value,
    price: selectedPrice.value,
    rating: selectedRating.value
  })
}

const categories = [
  { value: 'smartphones', label: 'Smartphones', count: 24 },
  { value: 'laptops', label: 'Laptops', count: 18 },
  { value: 'fragrances', label: 'Fragrances', count: 12 },
  { value: 'skincare', label: 'Skincare', count: 30 },
  { value: 'groceries', label: 'Groceries', count: 45 },
  { value: 'home-decoration', label: 'Home Décor', count: 22 },
  { value: 'furniture', label: 'Furniture', count: 15 },
  { value: 'tops', label: 'Tops', count: 20 },
]

const priceRanges = [
  { value: '0-25', label: 'Under $25' },
  { value: '25-50', label: '$25 – $50' },
  { value: '50-100', label: '$50 – $100' },
  { value: '100-250', label: '$100 – $250' },
  { value: '250+', label: 'Over $250' },
]
</script>