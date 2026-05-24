<template>
  <section class="px-4 lg:px-6 py-4">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-white font-black text-xl" style="font-family:'Sora',sans-serif">New Arrivals</h2>
        <p class="text-white/40 text-sm">Fresh products just landed</p>
      </div>
      <div class="flex gap-2">
        <button @click="scrollLeft" class="w-8 h-8 bg-slate-800 border border-white/10 text-white rounded-xl flex items-center justify-center hover:bg-slate-700 hover:border-amber-400/30 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button @click="scrollRight" class="w-8 h-8 bg-slate-800 border border-white/10 text-white rounded-xl flex items-center justify-center hover:bg-slate-700 hover:border-amber-400/30 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex gap-4 overflow-hidden">
      <div v-for="i in 6" :key="i" class="flex-shrink-0 w-44 bg-slate-800/60 rounded-2xl overflow-hidden">
        <div class="h-44 bg-slate-700/50 animate-pulse"></div>
        <div class="p-3 space-y-2">
          <div class="h-2 bg-slate-700 rounded animate-pulse w-1/3"></div>
          <div class="h-3 bg-slate-700 rounded animate-pulse"></div>
          <div class="h-4 bg-slate-700 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>

    <div ref="scrollContainer" class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-1" v-else>
      <div
        v-for="product in products"
        :key="product.id"
        class="flex-shrink-0 w-44 bg-slate-800/60 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-400/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
      >
        <!-- Image -->
        <div @click="$router.push(`/product/${product.id}`)" class="bg-slate-700/50 h-44 flex items-center justify-center overflow-hidden cursor-pointer">
          <img
            v-if="product.thumbnail"
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <!-- Info -->
        <div class="p-3">
          <div class="inline-block bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5">New</div>
          <p @click="$router.push(`/product/${product.id}`)" class="text-white/80 text-xs font-medium line-clamp-2 leading-snug mb-2 cursor-pointer hover:text-white transition-colors">{{ product.title }}</p>
          <div class="flex items-center justify-between">
            <span class="text-amber-400 font-bold text-sm">${{ product.price }}</span>
            <button @click="handleAdd(product)" :class="['w-7 h-7 rounded-lg flex items-center justify-center transition-all text-xs', addedIds.has(product.id) ? 'bg-emerald-500 text-white' : 'bg-amber-400/20 hover:bg-amber-400 text-amber-400 hover:text-slate-900']">
              <svg v-if="!addedIds.has(product.id)" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCart } from '@/composables/useCart.js'

const { addToCart } = useCart()
const products = ref([])
const loading = ref(true)
const scrollContainer = ref(null)
const addedIds = ref(new Set())

async function fetchProducts() {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=12&skip=10')
    const data = await res.json()
    products.value = data.products
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

function handleAdd(product) {
  addToCart(product)
  addedIds.value = new Set([...addedIds.value, product.id])
  setTimeout(() => {
    const s = new Set(addedIds.value)
    s.delete(product.id)
    addedIds.value = s
  }, 1800)
}

function scrollLeft() { scrollContainer.value?.scrollBy({ left: -500, behavior: 'smooth' }) }
function scrollRight() { scrollContainer.value?.scrollBy({ left: 500, behavior: 'smooth' }) }

onMounted(fetchProducts)
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>