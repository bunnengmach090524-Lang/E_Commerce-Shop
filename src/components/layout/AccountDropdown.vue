<template>
  <div class="relative" @mouseenter="open = true" @mouseleave="open = false">
    <!-- Trigger -->
    <button class="hidden md:flex flex-col items-start px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all duration-200 group">
      <span class="text-white/50 text-[10px] leading-none">Hello, Sign in</span>
      <span class="text-white text-xs font-semibold leading-tight group-hover:text-amber-400 transition-colors flex items-center gap-1">
        Account & Lists
        <svg class="w-3 h-3 transition-transform duration-200" :class="open ? 'rotate-180' : ''" fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 8l4.5 4.5L14.5 8"/></svg>
      </span>
    </button>

    <!-- Dropdown Panel -->
    <Transition name="dropdown">
      <div v-if="open" class="absolute right-0 top-full mt-1 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
        <!-- Arrow -->
        <div class="absolute -top-1.5 right-8 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45"></div>

        <!-- Sign in button -->
        <div class="px-5 pt-5 pb-4 border-b border-gray-100">
          <button @click="$router.push('/signin')" class="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm rounded-full transition-all hover:shadow-md hover:scale-[1.02]">
            Sign in
          </button>
          <p class="text-center text-xs text-gray-500 mt-2">
            New customer?
            <router-link to="/signup" class="text-blue-600 hover:underline font-medium">Start here.</router-link>
          </p>
        </div>

        <!-- Two columns -->
        <div class="grid grid-cols-2 gap-0">
          <!-- Your Lists -->
          <div class="px-5 py-4 border-r border-gray-100">
            <h4 class="text-slate-900 font-bold text-sm mb-3">Your Lists</h4>
            <ul class="space-y-2">
              <li v-for="item in lists" :key="item">
                <a href="#" class="text-blue-600 hover:underline text-xs">{{ item }}</a>
              </li>
            </ul>
          </div>

          <!-- Your Account -->
          <div class="px-5 py-4">
            <h4 class="text-slate-900 font-bold text-sm mb-3">Your Account</h4>
            <ul class="space-y-2">
              <li v-for="item in account" :key="item.label">
                <router-link :to="item.to" class="text-blue-600 hover:underline text-xs">{{ item.label }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)

const lists = ['Create a List', 'Find a List or Registry']
const account = [
  { label: 'Account', to: '/account' },
  { label: 'Orders', to: '/orders' },
  { label: 'Recommendations', to: '/recommendations' },
  { label: 'Browsing History', to: '/history' },
  { label: 'Your Shopping preferences', to: '/preferences' },
  { label: 'Watchlist', to: '/watchlist' },
  { label: 'Video Purchases & Rentals', to: '/video' },
  { label: 'Kindle Unlimited', to: '/kindle' },
  { label: 'Content & Devices', to: '/devices' },
  { label: 'Subscribe & Save Items', to: '/subscribe' },
  { label: 'Memberships & Subscriptions', to: '/memberships' },
  { label: 'Music Library', to: '/music' },
]
</script>

<style scoped>
.dropdown-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.dropdown-enter-from { opacity: 0; transform: translateY(-6px); }
.dropdown-leave-to { opacity: 0; transform: translateY(-4px); }
</style>