<template>
  <div
    @click="$router.push(`/product/${product.id}`)"
    class="bg-slate-800/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-400/30 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
  >
    <!-- Image -->
    <div class="relative bg-slate-700/50 aspect-square flex items-center justify-center overflow-hidden">
      <img
        v-if="product.thumbnail"
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <span v-else class="text-5xl">📦</span>

      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <span v-if="product.discountPercentage > 20" class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow">
          -{{ Math.round(product.discountPercentage) }}%
        </span>
      </div>

      <!-- Actions on hover -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
        <button
          @click.stop="$emit('add-to-cart', product)"
          class="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
        >
          + Add to Cart
        </button>
      </div>

      <!-- Wishlist -->
      <button
        @click.stop="$emit('toggle-wish', product)"
        class="absolute top-2 right-2 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        :class="wished ? 'text-red-400' : 'text-white hover:text-red-400'"
      >
        <svg class="w-4 h-4" :fill="wished ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      </button>
    </div>

    <!-- Info -->
    <div class="p-3 flex flex-col flex-1">
      <p class="text-white/40 text-[10px] uppercase tracking-wider mb-1">{{ product.category }}</p>
      <p class="text-white/85 text-xs font-medium line-clamp-2 leading-snug flex-1 mb-2">{{ product.title }}</p>

      <!-- Stars -->
      <div class="flex items-center gap-1 mb-2">
        <div class="flex gap-0.5">
          <svg v-for="s in 5" :key="s" class="w-3 h-3" :class="s <= Math.round(product.rating) ? 'text-amber-400' : 'text-white/15'" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <span class="text-white/30 text-[10px]">{{ product.rating?.toFixed(1) }}</span>
      </div>

      <!-- Price row -->
      <div class="flex items-center justify-between mt-auto">
        <div class="flex items-center gap-1.5">
          <span class="text-white font-bold text-sm">${{ product.price }}</span>
          <span v-if="product.discountPercentage" class="text-white/25 line-through text-xs">
            ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(0) }}
          </span>
        </div>
        <button
          @click.stop="$emit('add-to-cart', product)"
          class="w-7 h-7 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg flex items-center justify-center transition-colors"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ product: { type: Object, required: true } })
defineEmits(['add-to-cart', 'toggle-wish'])

const wished = ref(false)
</script>