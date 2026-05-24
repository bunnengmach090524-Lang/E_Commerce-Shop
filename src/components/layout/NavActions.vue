<template>
  <div class="flex items-center gap-1">
    <!-- Account Dropdown -->
    <AccountDropdown />

    <!-- Returns & Orders -->
    <button class="hidden md:flex flex-col items-start px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all duration-200 group">
      <span class="text-white/50 text-[10px] leading-none">Returns</span>
      <span class="text-white text-xs font-semibold leading-tight group-hover:text-amber-400 transition-colors">& Orders</span>
    </button>

    <!-- Wishlist -->
    <button class="relative p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 group">
      <svg class="w-5 h-5 text-white group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
      <span v-if="wishlistCount" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{{ wishlistCount }}</span>
    </button>

    <!-- Cart -->
    <button @click="openCart" class="relative flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 group">
      <div class="relative">
        <svg class="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <Transition name="badge">
          <span :key="cartCount" class="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full flex items-center justify-center">{{ cartCount }}</span>
        </Transition>
      </div>
      <div class="hidden lg:flex flex-col items-start leading-none">
        <span class="text-white/50 text-[10px]">Cart</span>
        <span class="text-amber-400 text-xs font-bold">${{ cartTotal }}</span>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AccountDropdown from './AccountDropdown.vue'
import { useCart } from '@/composables/useCart.js'

const { cartCount, cartTotal, openCart } = useCart()
const wishlistCount = ref(5)
</script>

<style scoped>
.badge-enter-active { animation: pop 0.3s cubic-bezier(0.16,1,0.3,1); }
@keyframes pop { 0% { transform: scale(0.5); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }
</style>