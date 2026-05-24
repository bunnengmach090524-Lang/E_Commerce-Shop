<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition name="overlay">
      <div v-if="isOpen" @click="closeCart" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"></div>
    </Transition>

    <!-- Drawer -->
    <Transition name="drawer">
      <div v-if="isOpen" class="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-white/10 z-50 flex flex-col shadow-2xl">

        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center">
              <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <div>
              <h2 class="text-white font-bold text-base" style="font-family:'Sora',sans-serif">Shopping Cart</h2>
              <p class="text-white/40 text-xs">{{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }}</p>
            </div>
          </div>
          <button @click="closeCart" class="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="!cartItems.length" class="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <div class="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center">
            <svg class="w-10 h-10 text-white/20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <div>
            <p class="text-white/60 font-semibold mb-1">Your cart is empty</p>
            <p class="text-white/30 text-sm">Add items to get started</p>
          </div>
          <button @click="closeCart; $router.push('/shop')" class="px-6 py-2.5 bg-amber-400 text-slate-900 font-bold text-sm rounded-xl hover:bg-amber-300 transition-all">
            Start Shopping
          </button>
        </div>

        <!-- Items list -->
        <div v-else class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          <TransitionGroup name="cart-item">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="bg-slate-800/60 border border-white/5 rounded-2xl p-3 flex gap-3 group hover:border-white/10 transition-all"
            >
              <!-- Image -->
              <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-700">
                <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover" />
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">{{ item.category }}</p>
                <p class="text-white text-xs font-medium line-clamp-2 leading-snug mb-2">{{ item.title }}</p>

                <div class="flex items-center justify-between">
                  <!-- Qty controls -->
                  <div class="flex items-center gap-1 bg-slate-700/60 rounded-lg p-0.5">
                    <button @click="updateQty(item.id, item.qty - 1)" class="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-all text-sm font-bold">−</button>
                    <span class="text-white text-xs font-bold w-6 text-center">{{ item.qty }}</span>
                    <button @click="updateQty(item.id, item.qty + 1)" class="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-all text-sm font-bold">+</button>
                  </div>

                  <span class="text-amber-400 font-bold text-sm">${{ (item.price * item.qty).toFixed(2) }}</span>
                </div>
              </div>

              <!-- Remove -->
              <button @click="removeItem(item.id)" class="flex-shrink-0 opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-xl hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/></svg>
              </button>
            </div>
          </TransitionGroup>
        </div>

        <!-- Footer summary -->
        <div v-if="cartItems.length" class="border-t border-white/10 px-5 py-4 flex-shrink-0 space-y-3">
          <!-- Free shipping progress -->
          <div v-if="Number(cartTotal) < 50">
            <div class="flex justify-between text-xs mb-1.5">
              <span class="text-white/50">Add <span class="text-amber-400 font-semibold">${{ (50 - Number(cartTotal)).toFixed(2) }}</span> more for free shipping</span>
            </div>
            <div class="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500" :style="{ width: Math.min((Number(cartTotal) / 50) * 100, 100) + '%' }"></div>
            </div>
          </div>
          <div v-else class="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            You qualify for FREE shipping! 🎉
          </div>

          <!-- Subtotal -->
          <div class="flex justify-between items-center py-2 border-t border-white/5">
            <span class="text-white/60 text-sm">Subtotal ({{ cartCount }} items)</span>
            <span class="text-white font-black text-lg">${{ cartTotal }}</span>
          </div>

          <!-- Gift checkbox -->
          <label class="flex items-center gap-2 cursor-pointer">
            <div class="w-4 h-4 border border-white/20 rounded flex items-center justify-center flex-shrink-0">
              <input type="checkbox" class="hidden" />
            </div>
            <span class="text-white/50 text-xs">This order contains a gift</span>
          </label>

          <!-- CTA buttons -->
          <button @click="$router.push('/checkout'); closeCart()" class="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm rounded-2xl transition-all hover:shadow-xl hover:shadow-amber-400/20 hover:scale-[1.02]">
            Proceed to Checkout →
          </button>
          <button @click="$router.push('/cart'); closeCart()" class="w-full py-2.5 bg-slate-800 border border-white/10 hover:border-amber-400/30 text-white font-semibold text-sm rounded-2xl transition-all hover:bg-slate-700">
            View Full Cart
          </button>

          <!-- Clear cart -->
          <button @click="clearCart" class="w-full text-white/30 hover:text-red-400 text-xs font-medium transition-colors py-1">
            Clear cart
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useCart } from '@/composables/useCart.js'

const { cartItems, cartCount, cartTotal, isOpen, removeItem, updateQty, clearCart, closeCart } = useCart()
</script>

<style scoped>
.overlay-enter-active, .overlay-leave-active { transition: opacity 0.25s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

.drawer-enter-active { transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.drawer-leave-active { transition: transform 0.25s ease-in; }
.drawer-enter-from { transform: translateX(100%); }
.drawer-leave-to { transform: translateX(100%); }

.cart-item-enter-active { transition: all 0.3s ease; }
.cart-item-leave-active { transition: all 0.2s ease; }
.cart-item-enter-from { opacity: 0; transform: translateX(20px); }
.cart-item-leave-to { opacity: 0; transform: translateX(20px); height: 0; margin: 0; padding: 0; }
</style>