<template>
  <section class="px-4 lg:px-6 py-4">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-white font-black text-xl" style="font-family:'Sora',sans-serif">Top Picks for You</h2>
        <p class="text-white/40 text-sm">Curated based on trending products</p>
      </div>
      <button @click="$router.push('/shop')" class="text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors flex items-center gap-1">
        View all
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div v-for="i in 10" :key="i" class="bg-slate-800/60 rounded-2xl overflow-hidden">
        <div class="aspect-square bg-slate-700/50 animate-pulse"></div>
        <div class="p-3 space-y-2">
          <div class="h-2.5 bg-slate-700 rounded animate-pulse w-1/3"></div>
          <div class="h-3 bg-slate-700 rounded animate-pulse"></div>
          <div class="h-3 bg-slate-700 rounded animate-pulse w-2/3"></div>
          <div class="h-4 bg-slate-700 rounded animate-pulse w-1/2 mt-2"></div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-12">
      <span class="text-4xl mb-3 block">😕</span>
      <p class="text-white/50 mb-3">Failed to load products</p>
      <button @click="fetchProducts" class="px-4 py-2 bg-amber-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-amber-300 transition-colors">Retry</button>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/shoppage/ProductCard.vue'

const products = ref([])
const loading = ref(true)
const error = ref(false)

async function fetchProducts() {
  loading.value = true
  error.value = false
  try {
    const res = await fetch('https://dummyjson.com/products?limit=10&skip=0')
    const data = await res.json()
    products.value = data.products
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)
</script>