<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="cartStore.isDrawerOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[7000]"
      @click="cartStore.closeDrawer()"
    />
  </Transition>

  <!-- Drawer Panel -->
  <Transition name="slide-right">
    <div
      v-if="cartStore.isDrawerOpen"
      class="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[7001] flex flex-col shadow-2xl"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 bg-[#131921] text-white">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-[#ffd814]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19"/>
          </svg>
          <h2 class="text-lg font-bold">
            Cart
            <span class="ml-2 text-sm font-normal text-gray-300">({{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'item' : 'items' }})</span>
          </h2>
        </div>
        <button
          @click="cartStore.closeDrawer()"
          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Free shipping bar -->
      <div v-if="cartStore.subtotal < 50" class="bg-amber-50 border-b border-amber-100 px-6 py-3">
        <div class="flex justify-between text-xs text-amber-700 mb-1.5 font-medium">
          <span>Add ${{ (50 - cartStore.subtotal).toFixed(2) }} more for FREE shipping</span>
          <span>{{ Math.round((cartStore.subtotal / 50) * 100) }}%</span>
        </div>
        <div class="h-1.5 bg-amber-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-[#ffd814] rounded-full transition-all duration-500"
            :style="{ width: Math.min((cartStore.subtotal / 50) * 100, 100) + '%' }"
          />
        </div>
      </div>
      <div v-else class="bg-green-50 border-b border-green-100 px-6 py-2.5 flex items-center gap-2">
        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span class="text-xs text-green-700 font-semibold">Your order qualifies for FREE Shipping!</span>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <!-- Empty state -->
        <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center h-full gap-4 text-center">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19"/>
            </svg>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-800">Your cart is empty</p>
            <p class="text-sm text-gray-400 mt-1">Add items to get started</p>
          </div>
          <button
            @click="cartStore.closeDrawer()"
            class="bg-[#ffd814] hover:bg-[#f0c62e] text-gray-900 font-bold px-8 py-2.5 rounded-full text-sm transition-all"
          >
            Continue Shopping
          </button>
        </div>

        <!-- Items -->
        <TransitionGroup name="cart-item" tag="div" class="space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-gray-200 transition-all group"
          >
            <!-- Image -->
            <div class="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 flex items-center justify-center">
              <img
                v-if="item.thumbnail || item.image"
                :src="item.thumbnail || item.image"
                :alt="item.title || item.name"
                class="w-full h-full object-contain p-1"
              />
              <span v-else class="text-3xl">{{ item.emoji || '📦' }}</span>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 mb-1">
                {{ item.title || item.name }}
              </p>
              <p v-if="item.brand" class="text-xs text-gray-400 mb-2">{{ item.brand }}</p>
              <div class="flex items-center gap-2">
                <span class="text-base font-bold text-gray-900">${{ (item.price * item.qty).toFixed(2) }}</span>
                <span v-if="item.qty > 1" class="text-xs text-gray-400">(${{ item.price.toFixed(2) }} each)</span>
              </div>

              <!-- Qty controls + remove -->
              <div class="flex items-center gap-3 mt-3">
                <div class="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white shadow-sm">
                  <button
                    @click="cartStore.updateQty(item.id, item.qty - 1)"
                    class="w-8 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors text-lg leading-none"
                  >−</button>
                  <span class="w-8 text-center text-sm font-bold text-gray-800">{{ item.qty }}</span>
                  <button
                    @click="cartStore.updateQty(item.id, item.qty + 1)"
                    class="w-8 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors text-lg leading-none"
                  >+</button>
                </div>
                <button
                  @click="cartStore.removeItem(item.id)"
                  class="text-xs text-red-400 hover:text-red-600 transition-colors font-medium flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Footer / Checkout -->
      <div v-if="cartStore.items.length > 0" class="border-t border-gray-100 px-6 py-5 space-y-3 bg-white">
        <div class="flex justify-between items-center">
          <span class="text-gray-500 text-sm">Subtotal ({{ cartStore.totalItems }} items)</span>
          <span class="text-xl font-bold text-gray-900">${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>
        <button
          @click="goToCart"
          class="w-full bg-[#ffd814] hover:bg-[#f0c62e] active:scale-[0.99] text-gray-900 font-bold py-3.5 rounded-xl transition-all duration-150 shadow-sm hover:shadow text-sm tracking-wide"
        >
          Proceed to Checkout
        </button>
        <button
          @click="goToCart"
          class="w-full border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-all text-sm hover:bg-gray-50"
        >
          View Full Cart
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

function goToCart() {
  cartStore.closeDrawer()
  router.push('/cart')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active { transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.slide-right-leave-active { transition: transform 0.25s ease-in; }
.slide-right-enter-from { transform: translateX(100%); }
.slide-right-leave-to { transform: translateX(100%); }

.cart-item-enter-active { transition: all 0.3s ease; }
.cart-item-leave-active { transition: all 0.25s ease; }
.cart-item-enter-from { opacity: 0; transform: translateX(20px); }
.cart-item-leave-to { opacity: 0; transform: translateX(-20px) scale(0.95); }
</style>