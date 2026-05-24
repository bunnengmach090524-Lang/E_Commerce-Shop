<template>
  <div class="min-h-screen bg-slate-900">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-6">

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col lg:flex-row gap-8 animate-pulse">
        <div class="lg:w-5/12">
          <div class="aspect-square bg-slate-800 rounded-2xl"></div>
          <div class="flex gap-2 mt-3">
            <div v-for="i in 4" :key="i" class="w-16 h-16 bg-slate-800 rounded-xl"></div>
          </div>
        </div>
        <div class="flex-1 space-y-4">
          <div class="h-3 bg-slate-800 rounded w-1/4"></div>
          <div class="h-6 bg-slate-800 rounded w-3/4"></div>
          <div class="h-6 bg-slate-800 rounded w-2/4"></div>
          <div class="h-10 bg-slate-800 rounded w-1/3 mt-4"></div>
          <div class="h-4 bg-slate-800 rounded"></div>
          <div class="h-4 bg-slate-800 rounded w-4/5"></div>
          <div class="h-4 bg-slate-800 rounded w-3/5"></div>
        </div>
      </div>

      <!-- Product -->
      <div v-else-if="product" class="flex flex-col lg:flex-row gap-8">

        <!-- LEFT: Images -->
        <div class="lg:w-5/12">
          <!-- Main image -->
          <div class="bg-slate-800/60 border border-white/5 rounded-2xl overflow-hidden aspect-square flex items-center justify-center relative group">
            <Transition name="img-fade" mode="out-in">
              <img :key="activeImage" :src="activeImage" :alt="product.title" class="w-full h-full object-cover" />
            </Transition>
            <!-- Zoom hint -->
            <div class="absolute bottom-3 right-3 bg-black/50 text-white/60 text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Click to zoom
            </div>
          </div>

          <!-- Thumbnails -->
          <div class="flex gap-2 mt-3 overflow-x-auto pb-1">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              @click="activeImage = img"
              class="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all hover:scale-105"
              :class="activeImage === img ? 'border-amber-400 shadow-lg shadow-amber-400/20' : 'border-white/10 hover:border-white/30'"
            >
              <img :src="img" :alt="`view-${i}`" class="w-full h-full object-cover" />
            </button>
          </div>

          <!-- Wishlist + Share -->
          <div class="flex gap-2 mt-3">
            <button
              @click="wished = !wished"
              :class="['flex-1 py-2.5 flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-all', wished ? 'border-red-400/50 bg-red-400/10 text-red-400' : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white']"
            >
              <svg class="w-4 h-4" :fill="wished ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              {{ wished ? 'Wishlisted' : 'Add to Wishlist' }}
            </button>
            <button class="px-4 py-2.5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 rounded-xl text-sm transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </button>
          </div>
        </div>

        <!-- RIGHT: Info -->
        <div class="flex-1 space-y-4">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-white/30 text-xs flex-wrap">
            <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
            <span>/</span>
            <router-link :to="`/shop?category=${product.category}`" class="hover:text-white transition-colors capitalize">{{ product.category }}</router-link>
            <span>/</span>
            <span class="text-white/50 truncate max-w-xs">{{ product.title }}</span>
          </div>

          <!-- Brand -->
          <p class="text-amber-400 text-sm font-semibold">{{ product.brand || product.category }}</p>

          <!-- Title -->
          <h1 class="text-white font-black text-xl lg:text-2xl leading-tight" style="font-family:'Sora',sans-serif">{{ product.title }}</h1>

          <!-- Rating + Reviews -->
          <div class="flex items-center gap-3 flex-wrap">
            <div class="flex items-center gap-1.5">
              <div class="flex gap-0.5">
                <svg v-for="s in 5" :key="s" class="w-4 h-4" :class="s <= Math.round(product.rating) ? 'text-amber-400' : 'text-white/20'" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <span class="text-amber-400 text-sm font-semibold">{{ product.rating }}</span>
            </div>
            <span class="text-amber-400 text-sm hover:underline cursor-pointer">{{ product.stock }} ratings</span>
            <span class="text-white/20">|</span>
            <span class="text-emerald-400 text-sm font-semibold">✓ In Stock ({{ product.stock }} left)</span>
          </div>

          <!-- Best seller badge -->
          <div v-if="product.rating >= 4.5" class="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <svg class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="text-amber-400 text-xs font-bold">#1 Best Seller in {{ product.category }}</span>
          </div>

          <!-- Divider -->
          <div class="border-t border-white/10"></div>

          <!-- Price -->
          <div class="flex items-end gap-3">
            <span class="text-white font-black text-3xl">${{ product.price }}</span>
            <span class="text-white/30 line-through text-base pb-0.5">
              ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
            </span>
            <span class="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-lg pb-0.5">
              Save {{ Math.round(product.discountPercentage) }}%
            </span>
          </div>

          <!-- Description -->
          <p class="text-white/60 text-sm leading-relaxed">{{ product.description }}</p>

          <!-- Product details -->
          <div class="bg-slate-800/50 border border-white/5 rounded-xl p-4 space-y-2 text-sm">
            <div v-if="product.brand" class="flex gap-3">
              <span class="text-white/40 w-28 flex-shrink-0">Brand</span>
              <span class="text-white font-medium">{{ product.brand }}</span>
            </div>
            <div class="flex gap-3">
              <span class="text-white/40 w-28 flex-shrink-0">SKU</span>
              <span class="text-white/70">{{ product.sku || 'N/A' }}</span>
            </div>
            <div class="flex gap-3">
              <span class="text-white/40 w-28 flex-shrink-0">Availability</span>
              <span class="text-emerald-400 font-medium">{{ product.availabilityStatus || 'In Stock' }}</span>
            </div>
            <div v-if="product.warrantyInformation" class="flex gap-3">
              <span class="text-white/40 w-28 flex-shrink-0">Warranty</span>
              <span class="text-white/70">{{ product.warrantyInformation }}</span>
            </div>
            <div v-if="product.shippingInformation" class="flex gap-3">
              <span class="text-white/40 w-28 flex-shrink-0">Shipping</span>
              <span class="text-emerald-400 font-medium">{{ product.shippingInformation }}</span>
            </div>
            <div v-if="product.returnPolicy" class="flex gap-3">
              <span class="text-white/40 w-28 flex-shrink-0">Returns</span>
              <span class="text-white/70">{{ product.returnPolicy }}</span>
            </div>
          </div>

          <!-- Quantity selector -->
          <div class="flex items-center gap-3">
            <span class="text-white/60 text-sm font-medium">Quantity:</span>
            <div class="flex items-center border border-white/20 rounded-xl overflow-hidden">
              <button @click="qty = Math.max(1, qty - 1)" class="px-4 py-2 text-white hover:bg-white/10 transition-colors font-bold text-lg">−</button>
              <span class="px-5 py-2 text-white font-bold border-x border-white/20 min-w-[50px] text-center">{{ qty }}</span>
              <button @click="qty = Math.min(product.stock, qty + 1)" class="px-4 py-2 text-white hover:bg-white/10 transition-colors font-bold text-lg">+</button>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="handleAddToCart"
              :class="['flex-1 py-3.5 font-black text-sm rounded-2xl transition-all flex items-center justify-center gap-2', added ? 'bg-emerald-500 text-white' : 'bg-amber-400 hover:bg-amber-300 text-slate-900 hover:shadow-xl hover:shadow-amber-400/20 hover:scale-[1.02]']"
            >
              <svg v-if="added" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {{ added ? 'Added to Cart!' : 'Add to Cart' }}
            </button>
            <button @click="handleBuyNow" class="flex-1 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-black text-sm rounded-2xl transition-all hover:shadow-xl hover:shadow-orange-500/20 hover:scale-[1.02]">
              Buy Now
            </button>
          </div>

          <!-- Tags -->
          <div v-if="product.tags?.length" class="flex flex-wrap gap-2">
            <span v-for="tag in product.tags" :key="tag" class="px-3 py-1 bg-slate-800 border border-white/10 text-white/50 text-xs rounded-lg capitalize hover:border-amber-400/30 hover:text-white/70 cursor-pointer transition-all">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Reviews section -->
      <div v-if="product && product.reviews?.length" class="mt-10">
        <h2 class="text-white font-black text-xl mb-5" style="font-family:'Sora',sans-serif">Customer Reviews</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="review in product.reviews" :key="review.reviewerEmail" class="bg-slate-800/60 border border-white/5 rounded-2xl p-4">
            <div class="flex items-start justify-between gap-3 mb-2">
              <div>
                <p class="text-white font-semibold text-sm">{{ review.reviewerName }}</p>
                <p class="text-white/30 text-xs">{{ new Date(review.date).toLocaleDateString() }}</p>
              </div>
              <div class="flex gap-0.5 flex-shrink-0">
                <svg v-for="s in 5" :key="s" class="w-3.5 h-3.5" :class="s <= review.rating ? 'text-amber-400' : 'text-white/20'" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
            </div>
            <p class="text-white/60 text-sm leading-relaxed">{{ review.comment }}</p>
          </div>
        </div>
      </div>

      <!-- Similar products -->
      <div v-if="similar.length" class="mt-10">
        <h2 class="text-white font-black text-xl mb-5" style="font-family:'Sora',sans-serif">Similar Products</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <ProductCard v-for="p in similar" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart.js'
import ProductCard from '@/components/shoppage/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const { addToCart, openCart } = useCart()

const product = ref(null)
const loading = ref(true)
const activeImage = ref('')
const qty = ref(1)
const wished = ref(false)
const added = ref(false)
const similar = ref([])

async function fetchProduct() {
  loading.value = true
  qty.value = 1
  added.value = false
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    const data = await res.json()
    product.value = data
    activeImage.value = data.thumbnail
    fetchSimilar(data.category)
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

async function fetchSimilar(category) {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=5`)
    const data = await res.json()
    similar.value = data.products.filter(p => p.id !== product.value?.id).slice(0, 5)
  } catch (e) { console.error(e) }
}

function handleAddToCart() {
  for (let i = 0; i < qty.value; i++) addToCart(product.value)
  added.value = true
  setTimeout(() => { added.value = false }, 2000)
}

function handleBuyNow() {
  handleAddToCart()
  setTimeout(() => router.push('/cart'), 300)
}

watch(() => route.params.id, fetchProduct)
onMounted(fetchProduct)
</script>

<style scoped>
.img-fade-enter-active, .img-fade-leave-active { transition: opacity 0.2s ease; }
.img-fade-enter-from, .img-fade-leave-to { opacity: 0; }
</style>