<template>
  <section class="relative overflow-hidden rounded-2xl mx-4 my-4 lg:mx-6" style="min-height:400px">
    <!-- Slides -->
    <div class="relative h-full">
      <TransitionGroup name="banner">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          v-show="currentSlide === i"
          class="absolute inset-0 flex items-center"
          :style="{ background: slide.bg }"
        >
          <!-- Background decoration -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20" :style="{ background: slide.accent }"></div>
            <div class="absolute -bottom-20 -left-10 w-64 h-64 rounded-full opacity-10" :style="{ background: slide.accent }"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 border-2" :style="{ borderColor: slide.accent }"></div>
          </div>

          <!-- Content -->
          <div class="relative z-10 flex flex-col lg:flex-row items-center w-full px-8 lg:px-16 gap-8 py-12">
            <div class="flex-1 text-center lg:text-left">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <div class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                <span class="text-white text-xs font-semibold uppercase tracking-wider">{{ slide.badge }}</span>
              </div>
              <h1 class="text-white font-black text-3xl lg:text-5xl leading-tight mb-3" style="font-family:'Sora',sans-serif">
                {{ slide.title }}
              </h1>
              <p class="text-white/70 text-base lg:text-lg mb-6 max-w-md" v-if="slide.subtitle">{{ slide.subtitle }}</p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button @click="$router.push('/shop')" class="px-7 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm">
                  Shop Now
                </button>
                <button class="px-7 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/30 transition-all duration-200 text-sm border border-white/30">
                  Learn More
                </button>
              </div>
            </div>

            <!-- Image placeholder / icons -->
            <div class="flex-1 flex items-center justify-center">
              <div class="grid grid-cols-3 gap-3 max-w-xs">
                <div
                  v-for="(product, j) in slide.products"
                  :key="j"
                  :class="['bg-white/15 backdrop-blur-sm rounded-2xl p-3 flex flex-col items-center gap-2 hover:bg-white/25 transition-all duration-200 cursor-pointer hover:scale-105', j === 1 ? 'col-span-1 row-span-1' : '']"
                >
                  <span class="text-3xl">{{ product.emoji }}</span>
                  <span class="text-white text-[10px] font-semibold text-center leading-tight">{{ product.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Controls -->
    <button @click="prev" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/50 transition-all z-20 hover:scale-110">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button @click="next" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/50 transition-all z-20 hover:scale-110">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      <button
        v-for="(_, i) in slides"
        :key="i"
        @click="currentSlide = i"
        :class="['h-1.5 rounded-full transition-all duration-300 bg-white', currentSlide === i ? 'w-6 opacity-100' : 'w-1.5 opacity-40']"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)

const slides = [
  {
    bg: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #9a3412 100%)',
    accent: '#fed7aa',
    badge: "Father's Day Deals",
    title: "Save on Gifts\nfor Dad",
    subtitle: "Headphones, watches, tools and more",
    products: [
      { emoji: '🎧', name: 'Headphones' },
      { emoji: '⌚', name: 'Watches' },
      { emoji: '👕', name: 'Fashion' },
      { emoji: '🔧', name: 'Tools' },
      { emoji: '🎮', name: 'Gaming' },
      { emoji: '📱', name: 'Tech' },
    ]
  },
  {
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0369a1 100%)',
    accent: '#bae6fd',
    badge: 'New Arrivals',
    title: "Latest Tech\nJust Dropped",
    subtitle: "Discover cutting-edge gadgets and electronics",
    products: [
      { emoji: '💻', name: 'Laptops' },
      { emoji: '📷', name: 'Cameras' },
      { emoji: '🖥️', name: 'Monitors' },
      { emoji: '⌨️', name: 'Keyboards' },
      { emoji: '🖱️', name: 'Mouse' },
      { emoji: '🔋', name: 'Batteries' },
    ]
  },
  {
    bg: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a78bfa 100%)',
    accent: '#ddd6fe',
    badge: 'Fashion Week',
    title: "Style That\nSpeaks Loud",
    subtitle: "Trending fashion for every occasion",
    products: [
      { emoji: '👗', name: 'Dresses' },
      { emoji: '👟', name: 'Sneakers' },
      { emoji: '👜', name: 'Bags' },
      { emoji: '🕶️', name: 'Sunglasses' },
      { emoji: '💍', name: 'Jewelry' },
      { emoji: '🧢', name: 'Caps' },
    ]
  }
]

let timer

function next() { currentSlide.value = (currentSlide.value + 1) % slides.length }
function prev() { currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length }

onMounted(() => { timer = setInterval(next, 4500) })
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.banner-enter-active, .banner-leave-active { transition: opacity 0.6s ease, transform 0.6s ease; }
.banner-enter-from { opacity: 0; transform: translateX(40px); }
.banner-leave-to { opacity: 0; transform: translateX(-40px); }
</style>