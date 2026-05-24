<template>
  <div class="min-h-screen bg-slate-900">
    <div class="max-w-screen-2xl mx-auto px-4 lg:px-6 py-6">

      <!-- Header row -->
      <div class="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <div class="flex items-center gap-2 text-white/30 text-xs mb-1">
            <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
            <span>/</span>
            <span class="text-white/60 capitalize">{{ pageTitle }}</span>
          </div>
          <h1 class="text-white font-black text-2xl capitalize" style="font-family:'Sora',sans-serif">{{ pageTitle }}</h1>
          <p class="text-white/40 text-sm mt-0.5">
            <span v-if="loading" class="inline-flex items-center gap-1.5">
              <span class="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
              Loading…
            </span>
            <span v-else>{{ total }} products found</span>
          </p>
        </div>

        <!-- Sort -->
        <select v-model="sortBy" @change="page = 1; fetchProducts()" class="bg-slate-800 border border-white/10 text-white text-sm px-3 py-2.5 rounded-xl outline-none focus:border-amber-400/40 transition-all cursor-pointer">
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Best Rating</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      <div class="flex gap-6">
        <!-- Sidebar -->
        <aside class="w-60 flex-shrink-0 hidden lg:block">
          <FilterSidebar @filter="handleFilter" />
        </aside>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <!-- Mobile filter -->
          <div class="mb-4 lg:hidden">
            <FilterSidebar @filter="handleFilter" />
          </div>

          <!-- Search bar -->
          <div class="mb-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                @input="debouncedSearch"
                type="text"
                placeholder="Search products..."
                class="w-full px-4 py-3 pl-10 bg-slate-800/60 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm outline-none focus:border-amber-400/40 transition-all"
              />
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <button v-if="searchQuery" @click="searchQuery = ''; page = 1; fetchProducts()" class="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          <!-- Loading skeleton -->
          <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            <div v-for="i in 12" :key="i" class="bg-slate-800/60 rounded-2xl overflow-hidden">
              <div class="aspect-square bg-slate-700/50 animate-pulse"></div>
              <div class="p-3 space-y-2">
                <div class="h-2.5 bg-slate-700 rounded animate-pulse w-1/3"></div>
                <div class="h-3 bg-slate-700 rounded animate-pulse"></div>
                <div class="h-3 bg-slate-700 rounded animate-pulse w-2/3"></div>
                <div class="h-4 bg-slate-700 rounded animate-pulse w-1/2 mt-2"></div>
              </div>
            </div>
          </div>

          <!-- Grid -->
          <div v-else>
            <div v-if="products.length" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>

            <!-- Empty -->
            <div v-else class="text-center py-24 flex flex-col items-center gap-4">
              <div class="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center">
                <svg class="w-10 h-10 text-white/20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </div>
              <div>
                <h3 class="text-white font-bold text-lg mb-1">No products found</h3>
                <p class="text-white/40 text-sm">Try adjusting your search or filters</p>
              </div>
              <button @click="reset" class="px-5 py-2.5 bg-amber-400 text-slate-900 font-bold text-sm rounded-xl hover:bg-amber-300 transition-all">
                Reset Filters
              </button>
            </div>

            <!-- Pagination -->
            <Pagination :current-page="page" :total-pages="totalPages" @change="changePage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import FilterSidebar from '@/components/shoppage/FilterSidebar.vue'
import ProductCard from '@/components/shoppage/ProductCard.vue'
import Pagination from '@/components/shoppage/Pagination.vue'

const route = useRoute()
const products = ref([])
const loading = ref(true)
const total = ref(0)
const page = ref(1)
const limit = 12
const sortBy = ref('default')
const searchQuery = ref('')
const activeFilters = ref({})
let searchTimer = null

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit)))
const pageTitle = computed(() => {
  if (route.query.q) return `Results for "${route.query.q}"`
  if (route.query.category) return route.query.category.replace(/-/g, ' ')
  return 'All Products'
})

async function fetchProducts() {
  loading.value = true
  try {
    const skip = (page.value - 1) * limit
    const q = searchQuery.value.trim() || route.query.q || ''
    const cat = route.query.category || ''
    let url

    if (q) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
    } else if (cat) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(cat)}?limit=${limit}&skip=${skip}`
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    }

    const res = await fetch(url)
    const data = await res.json()
    let prods = [...(data.products || [])]

    // Client-side sort
    if (sortBy.value === 'price-asc') prods.sort((a, b) => a.price - b.price)
    else if (sortBy.value === 'price-desc') prods.sort((a, b) => b.price - a.price)
    else if (sortBy.value === 'rating') prods.sort((a, b) => b.rating - a.rating)
    else if (sortBy.value === 'discount') prods.sort((a, b) => b.discountPercentage - a.discountPercentage)

    // Price range filter
    if (activeFilters.value.price) {
      const [min, max] = activeFilters.value.price.split('-').map(Number)
      prods = prods.filter(p => max ? p.price >= min && p.price <= max : p.price >= min)
    }

    // Rating filter
    if (activeFilters.value.rating) {
      prods = prods.filter(p => p.rating >= activeFilters.value.rating)
    }

    products.value = prods
    total.value = data.total || prods.length
  } catch (e) {
    console.error(e)
    products.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

function debouncedSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { page.value = 1; fetchProducts() }, 400)
}

function handleFilter(filters) {
  activeFilters.value = filters
  page.value = 1
  fetchProducts()
}

function changePage(p) {
  page.value = p
  fetchProducts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function reset() {
  searchQuery.value = ''
  activeFilters.value = {}
  sortBy.value = 'default'
  page.value = 1
  fetchProducts()
}

watch(() => route.query, () => { page.value = 1; fetchProducts() })
onMounted(fetchProducts)
</script>