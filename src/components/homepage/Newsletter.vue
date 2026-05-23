<template>
  <section class="px-4 lg:px-6 py-4">
    <div class="relative rounded-2xl overflow-hidden" style="background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)">
      <!-- Background decorations -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5" style="background:radial-gradient(circle, #f97316, transparent);transform:translate(-30%,-30%)"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5" style="background:radial-gradient(circle, #7c3aed, transparent);transform:translate(30%,30%)"></div>
        <!-- Grid lines -->
        <svg class="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div class="relative z-10 max-w-2xl mx-auto text-center px-6 py-12">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full mb-4">
          <svg class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span class="text-amber-400 text-xs font-semibold uppercase tracking-widest">Newsletter</span>
        </div>

        <h2 class="text-white font-black text-2xl lg:text-3xl mb-2" style="font-family:'Sora',sans-serif">
          Stay in the Loop
        </h2>
        <p class="text-white/50 text-sm mb-6 max-w-md mx-auto leading-relaxed">
          Subscribe for curated drops, early access to new collections, and exclusive member-only deals.
        </p>

        <!-- Form -->
        <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            v-model="emailInput"
            type="email"
            required
            placeholder="your@email.com"
            class="flex-1 px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all"
          />
          <button
            type="submit"
            class="px-6 py-3 text-xs tracking-widest uppercase font-bold rounded-xl transition-all duration-200 flex-shrink-0"
            :class="subscribeSuccess ? 'bg-emerald-500 text-white' : 'bg-amber-400 hover:bg-amber-300 text-slate-900 hover:shadow-lg hover:shadow-amber-400/20 hover:scale-105'"
          >
            {{ subscribeSuccess ? '✓ Subscribed!' : 'Subscribe' }}
          </button>
        </form>

        <p class="text-white/20 text-xs mt-4">No spam ever. Unsubscribe anytime.</p>

        <!-- Stats -->
        <div class="flex justify-center gap-8 mt-8 pt-8 border-t border-white/5">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-white font-black text-lg">{{ stat.value }}</div>
            <div class="text-white/30 text-[10px] uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const emailInput = ref('')
const subscribeSuccess = ref(false)

function handleSubscribe() {
  subscribeSuccess.value = true
  emailInput.value = ''
  setTimeout(() => { subscribeSuccess.value = false }, 3000)
}

const stats = [
  { value: '2M+', label: 'Subscribers' },
  { value: '50K+', label: 'Products' },
  { value: '4.8★', label: 'Rating' },
  { value: '180+', label: 'Countries' },
]
</script>