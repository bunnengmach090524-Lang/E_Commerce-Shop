<template>
  <section class="px-4 lg:px-6 py-4">
    <div class="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl p-5 relative overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div v-for="i in 6" :key="i" class="absolute rounded-full border-2 border-white" :style="{ width: `${i * 80}px`, height: `${i * 80}px`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }"></div>
      </div>

      <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <!-- Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <span class="text-xl">⚡</span>
          </div>
          <div>
            <div class="text-white/80 text-xs font-semibold uppercase tracking-widest">Limited Time</div>
            <div class="text-white font-black text-xl" style="font-family:'Sora',sans-serif">Flash Sale</div>
          </div>
        </div>

        <!-- Countdown -->
        <div class="flex items-center gap-2">
          <span class="text-white/70 text-sm font-medium">Ends in:</span>
          <div class="flex items-center gap-1.5">
            <div v-for="(unit, key) in countdown" :key="key" class="flex items-center gap-1">
              <div class="bg-black/30 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[50px] text-center">
                <div class="text-white font-black text-xl leading-none tabular-nums">{{ String(unit).padStart(2, '0') }}</div>
                <div class="text-white/50 text-[9px] uppercase tracking-wider mt-0.5">{{ key }}</div>
              </div>
              <span v-if="key !== 'secs'" class="text-white/50 font-bold text-lg">:</span>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <button @click="$router.push('/deals')" class="sm:ml-auto px-5 py-2.5 bg-white text-red-600 font-bold text-sm rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 flex-shrink-0">
          View All Deals →
        </button>
      </div>

      <!-- Products row -->
      <div class="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        <div
          v-for="product in flashProducts"
          :key="product.name"
          class="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-3 w-32 hover:bg-white/20 transition-all duration-200 cursor-pointer hover:scale-105 border border-white/10"
        >
          <span class="text-3xl block text-center mb-2">{{ product.emoji }}</span>
          <div class="text-white text-xs font-semibold truncate text-center">{{ product.name }}</div>
          <div class="flex items-center gap-1.5 justify-center mt-1">
            <span class="text-amber-300 font-bold text-sm">${{ product.price }}</span>
            <span class="text-white/40 line-through text-xs">${{ product.original }}</span>
          </div>
          <div class="mt-1.5 bg-amber-400/30 rounded-full px-2 py-0.5 text-center">
            <span class="text-amber-300 text-[10px] font-bold">-{{ product.discount }}%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const countdown = ref({ hrs: 5, mins: 43, secs: 21 })

let timer
onMounted(() => {
  timer = setInterval(() => {
    countdown.value.secs--
    if (countdown.value.secs < 0) { countdown.value.secs = 59; countdown.value.mins-- }
    if (countdown.value.mins < 0) { countdown.value.mins = 59; countdown.value.hrs-- }
    if (countdown.value.hrs < 0) { countdown.value.hrs = 0; countdown.value.mins = 0; countdown.value.secs = 0 }
  }, 1000)
})
onUnmounted(() => clearInterval(timer))

const flashProducts = [
  { name: 'AirPods Pro', emoji: '🎧', price: '149', original: '249', discount: 40 },
  { name: 'Smart Watch', emoji: '⌚', price: '89', original: '199', discount: 55 },
  { name: 'iPad Mini', emoji: '📱', price: '399', original: '599', discount: 33 },
  { name: 'Camera 4K', emoji: '📷', price: '299', original: '499', discount: 40 },
  { name: 'Gaming Mouse', emoji: '🖱️', price: '39', original: '79', discount: 51 },
  { name: 'Kindle', emoji: '📚', price: '79', original: '139', discount: 43 },
  { name: 'Drone', emoji: '🚁', price: '249', original: '499', discount: 50 },
]
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>