<template>
  <div class="bg-slate-800/80 backdrop-blur-sm border-b border-white/5">
    <div class="max-w-screen-2xl mx-auto px-4 flex items-center gap-1 h-10">
      <!-- ALL button -->
      <button
        @click="openModal"
        class="flex items-center gap-1.5 px-3 h-7 rounded-lg bg-white/10 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 text-white hover:text-amber-400 transition-all duration-200 text-xs font-semibold flex-shrink-0"
      >
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
        All
      </button>

      <!-- Nav links -->
      <nav class="hidden md:flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
        <router-link
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="px-3 h-7 flex items-center text-white/70 hover:text-white text-xs font-medium whitespace-nowrap rounded-lg hover:bg-white/10 transition-all duration-200 flex-shrink-0"
          active-class="text-amber-400 bg-amber-400/10"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <!-- Deals badge -->
      <div class="ml-auto flex-shrink-0">
        <router-link to="/deals" class="flex items-center gap-1 px-3 h-7 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Today's Deals
        </router-link>
      </div>
    </div>
  </div>

  <!-- Modal Overlay -->
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="isOpen" @click.self="closeModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex">
        <!-- Sidebar Panel -->
        <Transition name="slide">
          <div v-if="isOpen" class="relative w-80 max-w-[85vw] h-full bg-slate-900 border-r border-white/10 flex flex-col overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 bg-slate-800 border-b border-white/10 flex-shrink-0">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <span class="text-white font-bold text-sm">Hello, Sign in</span>
              </div>
              <button @click="closeModal" class="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <!-- Scrollable content -->
            <div class="flex-1 overflow-y-auto py-2">
              <div v-for="section in menuSections" :key="section.title" class="mb-1">
                <div class="px-4 py-2.5">
                  <h3 class="text-white font-bold text-sm mb-0.5">{{ section.title }}</h3>
                </div>
                <div>
                  <button
                    v-for="item in section.items"
                    :key="item"
                    @click="navigateTo(item)"
                    class="w-full flex items-center justify-between px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-150 group"
                  >
                    <span>{{ item }}</span>
                    <svg class="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
                <div class="mx-4 h-px bg-white/5 mt-1"></div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

function openModal() { isOpen.value = true }
function closeModal() { isOpen.value = false }

function navigateTo(item) {
  closeModal()
  router.push({ path: '/shop', query: { category: item.toLowerCase().replace(/ /g, '-') } })
}

const navLinks = [
  { label: 'Today\'s Deals', to: '/deals' },
  { label: 'Gift Cards', to: '/gift-cards' },
  { label: 'Sell', to: '/sell' },
  { label: 'Registry', to: '/registry' },
  { label: 'Prime Video', to: '/prime' },
  { label: 'Customer Service', to: '/help' },
  { label: 'New Arrivals', to: '/new' },
  { label: 'Best Sellers', to: '/best-sellers' },
]

const menuSections = [
  {
    title: 'Digital Content & Devices',
    items: ['Prime Video', 'Amazon Music', 'Kindle E-readers & Books', 'Amazon Appstore']
  },
  {
    title: 'Shop by Department',
    items: ['Electronics', 'Computers', 'Smart Home', 'Arts & Crafts', 'Automotive', 'Baby', 'Beauty & Personal Care', 'Women\'s Fashion', 'Men\'s Fashion', 'Health & Household']
  },
  {
    title: 'Programs & Features',
    items: ['Gift Cards', 'Shop By Interest', 'Amazon Live', 'International Shopping', 'Coupons', 'Subscribe & Save']
  },
  {
    title: 'Help & Settings',
    items: ['Your Account', 'Customer Service', 'Sign In', 'Sign Up']
  }
]
</script>

<style scoped>
.overlay-enter-active, .overlay-leave-active { transition: opacity 0.25s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

.slide-enter-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-leave-active { transition: transform 0.2s ease-in; }
.slide-enter-from { transform: translateX(-100%); }
.slide-leave-to { transform: translateX(-100%); }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>