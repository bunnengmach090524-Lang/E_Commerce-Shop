<template>
  <div class="min-h-screen bg-slate-900">
    <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-6">
      <h1 class="text-white font-black text-2xl mb-6" style="font-family:'Sora',sans-serif">Shopping Cart</h1>

      <!-- Empty cart -->
      <div v-if="!cartItems.length" class="flex flex-col items-center justify-center py-24 gap-5 text-center">
        <div class="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center">
          <svg class="w-12 h-12 text-white/20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <div>
          <h2 class="text-white font-bold text-xl mb-2">Your cart is empty</h2>
          <p class="text-white/40 text-sm">Add some products to get started!</p>
        </div>
        <router-link to="/shop" class="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-2xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-400/20">
          Continue Shopping
        </router-link>
      </div>

      <!-- Cart content -->
      <div v-else class="flex flex-col lg:flex-row gap-6">

        <!-- Left: items -->
        <div class="flex-1 min-w-0">
          <!-- Header row -->
          <div class="hidden md:flex justify-end pb-2 border-b border-white/10 mb-3">
            <span class="text-white/40 text-sm font-medium">Price</span>
          </div>

          <!-- Items -->
          <TransitionGroup name="cart-item" tag="div" class="space-y-0">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="border-b border-white/5 py-5 flex gap-4 group"
            >
              <!-- Product image -->
              <div class="w-32 h-32 flex-shrink-0 bg-slate-800 rounded-2xl overflow-hidden border border-white/5">
                <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover" />
              </div>

              <!-- Details -->
              <div class="flex-1 min-w-0">
                <!-- Title + price mobile -->
                <div class="flex justify-between gap-3">
                  <router-link :to="`/product/${item.id}`" class="text-white font-semibold text-sm leading-snug hover:text-amber-400 transition-colors line-clamp-3 flex-1">
                    {{ item.title }}
                  </router-link>
                  <span class="text-white font-bold text-sm flex-shrink-0 md:hidden">${{ (item.price * item.qty).toFixed(2) }}</span>
                </div>

                <!-- Badges -->
                <div class="flex flex-wrap gap-2 mt-2">
                  <span class="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">#1 Best Seller</span>
                  <span class="text-emerald-400 text-xs font-semibold">In Stock</span>
                </div>
                <p class="text-emerald-400 text-xs mt-1 font-medium">FREE International Returns</p>

                <!-- Gift checkbox -->
                <label class="flex items-center gap-2 mt-2 cursor-pointer">
                  <input type="checkbox" class="w-3.5 h-3.5 accent-amber-400" />
                  <span class="text-white/50 text-xs">This is a gift <span class="text-amber-400 hover:underline cursor-pointer">Learn more</span></span>
                </label>

                <!-- Category & variant info -->
                <p class="text-white/40 text-xs mt-1.5 capitalize">Category: {{ item.category }}</p>

                <!-- Qty + actions -->
                <div class="flex items-center gap-3 mt-3 flex-wrap">
                  <!-- Qty selector -->
                  <div class="flex items-center border border-white/20 rounded-xl overflow-hidden">
                    <button @click="updateQty(item.id, item.qty - 1)" class="px-3 py-1.5 text-white hover:bg-white/10 transition-colors text-sm font-bold">−</button>
                    <span class="px-3 py-1.5 text-white font-bold text-sm border-x border-white/20 min-w-[40px] text-center">{{ item.qty }}</span>
                    <button @click="updateQty(item.id, item.qty + 1)" class="px-3 py-1.5 text-white hover:bg-white/10 transition-colors text-sm font-bold">+</button>
                  </div>

                  <span class="text-white/20">|</span>
                  <button @click="removeItem(item.id)" class="text-red-400 hover:text-red-300 text-xs font-semibold transition-colors hover:underline">Delete</button>
                  <span class="text-white/20">|</span>
                  <button class="text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors hover:underline">Save for later</button>
                  <span class="text-white/20">|</span>
                  <button class="text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors hover:underline">Compare with similar</button>
                  <span class="text-white/20 hidden sm:block">|</span>
                  <button class="hidden sm:block text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors hover:underline">Share</button>
                </div>

                <!-- Subtotal per item (mobile) -->
                <p class="text-white/40 text-xs mt-2 md:hidden">
                  Subtotal: <span class="text-white font-bold">${{ (item.price * item.qty).toFixed(2) }}</span>
                </p>
              </div>

              <!-- Price column (desktop) -->
              <div class="hidden md:block flex-shrink-0 text-right w-28">
                <p class="text-white font-bold text-base">${{ (item.price * item.qty).toFixed(2) }}</p>
                <p v-if="item.qty > 1" class="text-white/40 text-xs mt-0.5">${{ item.price.toFixed(2) }} each</p>
              </div>
            </div>
          </TransitionGroup>

          <!-- Subtotal row -->
          <div class="flex justify-end pt-4 text-sm text-white/70">
            Subtotal ({{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }}):
            <span class="text-white font-black text-lg ml-2">${{ cartTotal }}</span>
          </div>

          <!-- Disclaimer -->
          <div class="mt-6 pt-6 border-t border-white/5">
            <p class="text-white/30 text-xs leading-relaxed">
              The price and availability of items at Shopy Market are subject to change. The Cart is a temporary place to store a list of items and reflects each item's most recent price.
              <button class="text-amber-400 hover:underline">Learn more</button>
            </p>
            <p class="text-white/30 text-xs mt-2">
              Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.
            </p>
          </div>
        </div>

        <!-- Right: order summary -->
        <div class="lg:w-72 flex-shrink-0">
          <div class="bg-slate-800/60 border border-white/10 rounded-2xl p-5 sticky top-20 space-y-4">
            <!-- Free shipping progress -->
            <div v-if="Number(cartTotal) < 50" class="space-y-2">
              <p class="text-white/60 text-xs">Add <span class="text-amber-400 font-bold">${{ (50 - Number(cartTotal)).toFixed(2) }}</span> more for free shipping</p>
              <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500" :style="{ width: Math.min((Number(cartTotal) / 50) * 100, 100) + '%' }"></div>
              </div>
            </div>
            <div v-else class="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              FREE Shipping Unlocked! 🎉
            </div>

            <!-- Subtotal -->
            <div>
              <p class="text-white/60 text-sm">
                Subtotal ({{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }}):
              </p>
              <p class="text-white font-black text-2xl mt-1">${{ cartTotal }}</p>
            </div>

            <!-- Gift checkbox -->
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="isGift" class="w-4 h-4 accent-amber-400" />
              <span class="text-white/60 text-sm">This order contains a gift</span>
            </label>

            <!-- Checkout button -->
            <button @click="$router.push('/checkout')" class="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm rounded-2xl transition-all hover:shadow-xl hover:shadow-amber-400/20 hover:scale-[1.02]">
              Proceed to checkout
            </button>

            <!-- Divider -->
            <div class="border-t border-white/5 pt-3 space-y-2">
              <h4 class="text-white font-bold text-sm">New international customers purchased</h4>
              <!-- Recommended products -->
              <div v-for="rec in recommended" :key="rec.id" class="flex gap-3 group cursor-pointer" @click="$router.push(`/product/${rec.id}`)">
                <div class="w-14 h-14 flex-shrink-0 bg-slate-700 rounded-xl overflow-hidden">
                  <img :src="rec.thumbnail" :alt="rec.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-amber-400 text-xs font-medium line-clamp-2 leading-snug group-hover:underline">{{ rec.title }}</p>
                  <div class="flex gap-0.5 mt-0.5">
                    <svg v-for="s in 5" :key="s" class="w-2.5 h-2.5" :class="s <= Math.round(rec.rating) ? 'text-amber-400' : 'text-white/15'" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <p class="text-red-400 text-[10px] font-semibold">-{{ Math.round(rec.discountPercentage) }}% <span class="text-white font-bold">${{ rec.price }}</span></p>
                  <button @click.stop="addToCart(rec)" class="mt-1 px-2 py-0.5 bg-amber-400 hover:bg-amber-300 text-slate-900 text-[10px] font-bold rounded-lg transition-all">
                    Add to cart
                  </button>
                </div>
              </div>

              <!-- Loading rec -->
              <div v-if="loadingRec" class="space-y-3">
                <div v-for="i in 2" :key="i" class="flex gap-3">
                  <div class="w-14 h-14 bg-slate-700 rounded-xl animate-pulse"></div>
                  <div class="flex-1 space-y-1.5">
                    <div class="h-3 bg-slate-700 rounded animate-pulse"></div>
                    <div class="h-3 bg-slate-700 rounded animate-pulse w-2/3"></div>
                    <div class="h-3 bg-slate-700 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCart } from '@/composables/useCart.js'

const { cartItems, cartCount, cartTotal, removeItem, updateQty, addToCart } = useCart()
const isGift = ref(false)
const recommended = ref([])
const loadingRec = ref(true)

async function fetchRecommended() {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=3&skip=20')
    const data = await res.json()
    recommended.value = data.products
  } catch (e) { console.error(e) }
  finally { loadingRec.value = false }
}

onMounted(fetchRecommended)
</script>

<style scoped>
.cart-item-enter-active { transition: all 0.3s ease; }
.cart-item-leave-active { transition: all 0.25s ease; position: absolute; width: 100%; }
.cart-item-enter-from { opacity: 0; transform: translateX(20px); }
.cart-item-leave-to { opacity: 0; transform: translateX(-20px); }
</style>