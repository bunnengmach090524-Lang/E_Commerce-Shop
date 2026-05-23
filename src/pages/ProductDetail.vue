<template>
  <div class="min-h-screen bg-slate-900">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-6">
      <!-- Loading -->
      <div v-if="loading" class="flex gap-8 animate-pulse">
        <div class="w-1/2 aspect-square bg-slate-800 rounded-2xl"></div>
        <div class="flex-1 space-y-4">
          <div class="h-6 bg-slate-800 rounded-xl w-2/3"></div>
          <div class="h-4 bg-slate-800 rounded-xl w-1/2"></div>
          <div class="h-10 bg-slate-800 rounded-xl w-1/3"></div>
        </div>
      </div>

      <div v-else-if="product" class="flex flex-col lg:flex-row gap-8">
        <!-- Images -->
        <div class="lg:w-1/2">
          <div class="bg-slate-800/60 rounded-2xl overflow-hidden aspect-square flex items-center justify-center mb-3">
            <img :src="activeImage" :alt="product.title" class="w-full h-full object-cover" />
          </div>
          <div class="flex gap-2 overflow-x-auto">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              @click="activeImage = img"
              class="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all"
              :class="activeImage === img ? 'border-amber-400' : 'border-white/10 hover:border-amber-400/40'"
            >
              <img :src="img" :alt="`thumb-${i}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="lg:w-1/2 space-y-4">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-white/30 text-xs">
            <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
            <span>/</span>
            <router-link to="/shop" class="hover:text-white transition-colors capitalize">{{ product.category }}</router-link>
            <span>/</span>
            <span class="text-white/50 truncate max-w-xs">{{ product.title }}</span>
          </div>

          <h1 class="text-white font-black text-2xl leading-tight" style="font-family:'Sora',sans-serif">{{ product.title }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-3">
            <div class="flex gap-0.5">
              <svg v-for="s in 5" :key="s" class="w-4 h-4" :class="s <= Math.round(product.rating) ? 'text-amber-400' : 'text-white/20'" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <span class="text-white/60 text-sm">{{ product.rating }} ({{ product.stock }} reviews)</span>
            <span class="text-emerald-400 text-sm font-semibold">✓ In Stock</span>
          </div>

          <!-- Price -->
          <div class="flex items-center gap-3">
            <span class="text-white font-black text-3xl">${{ product.price }}</span>
            <span class="text-white/30 line-through text-lg">${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(0) }}</span>
            <span class="bg-red-500/20 text-red-400 text-sm font-bold px-2 py-0.5 rounded-lg">-{{ Math.round(product.discountPercentage) }}%</span>
          </div>

          <p class="text-white/60 text-sm leading-relaxed">{{ product.description }}</p>

          <!-- Quantity -->
          <div class="flex items-center gap-3">
            <span class="text-white/60 text-sm">Quantity:</span>
            <div class="flex items-center gap-2 bg-slate-800 border border-white/10 rounded-xl p-1">
              <button @click="qty = Math.max(1, qty - 1)" class="w-8 h-8 flex items-center justify-center text-white hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
              </button>
              <span class="text-white font-bold w-8 text-center">{{ qty }}</span>
              <button @click="qty++" class="w-8 h-8 flex items-center justify-center text-white hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex gap-3">
            <button class="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-2xl transition-all hover:shadow-xl hover:shadow-amber-400/20 hover:scale-[1.02]">
              Add to Cart
            </button>
            <button class="flex-1 py-3 bg-slate-800 border border-white/10 hover:border-amber-400/30 text-white font-bold rounded-2xl transition-all hover:bg-slate-700">
              Buy Now
            </button>
            <button class="w-12 h-12 bg-slate-800 border border-white/10 hover:border-red-400/40 text-white hover:text-red-400 rounded-2xl flex items-center justify-center transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </button>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 pt-2">
            <span v-for="tag in product.tags" :key="tag" class="px-3 py-1 bg-slate-800 border border-white/10 text-white/50 text-xs rounded-lg">{{ tag }}</span>
          </div>

          <!-- Details -->
          <div class="bg-slate-800/60 rounded-2xl p-4 space-y-2 text-sm border border-white/5">
            <div class="flex justify-between"><span class="text-white/40">Brand</span><span class="text-white font-medium">{{ product.brand }}</span></div>
            <div class="flex justify-between"><span class="text-white/40">SKU</span><span class="text-white/60">{{ product.sku }}</span></div>
            <div class="flex justify-between"><span class="text-white/40">Availability</span><span class="text-emerald-400 font-medium">{{ product.availabilityStatus }}</span></div>
            <div class="flex justify-between"><span class="text-white/40">Warranty</span><span class="text-white/60">{{ product.warrantyInformation }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const activeImage = ref('')
const qty = ref(1)

async function fetchProduct() {
  loading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    const data = await res.json()
    product.value = data
    activeImage.value = data.thumbnail
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, fetchProduct)
onMounted(fetchProduct)
</script>