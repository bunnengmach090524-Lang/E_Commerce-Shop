<template>
  <div class="min-h-screen bg-slate-900 max-w-screen-2xl mx-auto px-4 lg:px-6 py-6">
    <!-- Breadcrumb + title -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-white/30 text-xs mb-1">
          <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
          <span>/</span>
          <span class="text-white/60">{{ pageTitle }}</span>
        </div>
        <h1 class="text-white font-black text-2xl" style="font-family:'Sora',sans-serif">{{ pageTitle }}</h1>
        <p class="text-white/40 text-sm mt-0.5">{{ total }} products found</p>
      </div>

      <!-- Sort -->
      <select v-model="sortBy" @change="fetchProducts" class="bg-slate-800 border border-white/10 text-white text-sm px-3 py-2 rounded-xl outline-none focus:border-amber-400/40 transition-all cursor-pointer">
        <option value="default">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Best Rating</option>
        <option value="newest">Newest</option>
      </select>
    </div>

    <div class="flex gap-6">
      <!-- Sidebar -->
      <aside class="w-56 flex-shrink-0 hidden lg:block">
        <FilterSidebar @filter="handleFilter" />
      </aside>

      <!-- Main content -->
      <div class="flex-1 min-w-0">
        <!-- Mobile search + filter -->
        <div class="flex gap-3 mb-4 lg:hidden">
          <div class="flex-1"><ShopSearchBar @search="handleSearch" /></div>
        </div>
        <div class="mb-4 lg:hidden">
          <FilterSidebar @filter="handleFilter" />
        </div>

        <!-- Desktop search bar -->
        <div class="hidden lg:block mb-4">
          <ShopSearchBar @search="handleSearch" />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          <div v-for="i in 12" :key="i" class="bg-slate-800/60 rounded-2xl h-72 animate-pulse"></div>
        </div>

        <!-- Grid -->
        <div v-else>
          <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @add-to-cart="addToCart"
              @toggle-wish="toggleWish"
            />
          </div>

          <!-- Empty -->
          <div v-if="!products.length" class="text-center py-20">
            <span class="text-6xl block mb-4">🔍</span>
            <h3 class="text-white font-bold text-lg mb-2">No products found</h3>
            <p class="text-white/40 text-sm">Try adjusting your search or filters</p>
          </div>

          <!-- Pagination -->
          <Pagination :current-page="page" :total-pages="totalPages" @change="changePage" />
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
import ShopSearchBar from '@/components/shoppage/SearchBar.vue'

const route = useRoute()

const products = ref([])
const loading = ref(true)
const total = ref(0)
const page = ref(1)
const limit = 12
const sortBy = ref('default')
const searchQuery = ref('')
const activeFilters = ref({})

const totalPages = computed(() => Math.ceil(total.value / limit))
const pageTitle = computed(() => {
  if (route.query.q) return `Results for "${route.query.q}"`
  if (route.query.category) return route.query.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return 'All Products'
})

async function fetchProducts() {
  loading.value = true
  try {
    const skip = (page.value - 1) * limit
    const category = route.query.category || activeFilters.value.category
    let url

    if (searchQuery.value) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery.value)}&limit=${limit}&skip=${skip}`
    } else if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    }

    const res = await fetch(url)
    const data = await res.json()
    let prods = data.products

    // Sort
    if (sortBy.value === 'price-asc') prods.sort((a, b) => a.price - b.price)
    else if (sortBy.value === 'price-desc') prods.sort((a, b) => b.price - a.price)
    else if (sortBy.value === 'rating') prods.sort((a, b) => b.rating - a.rating)

    products.value = prods
    total.value = data.total
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function handleFilter(filters) { activeFilters.value = filters; page.value = 1; fetchProducts() }
function handleSearch(q) { searchQuery.value = q; page.value = 1; fetchProducts() }
function changePage(p) { page.value = p; fetchProducts(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
function addToCart(product) { console.log('Add to cart:', product.title) }
function toggleWish(product) { console.log('Toggle wish:', product.title) }

watch(() => route.query, () => { page.value = 1; fetchProducts() })
onMounted(fetchProducts)
</script>