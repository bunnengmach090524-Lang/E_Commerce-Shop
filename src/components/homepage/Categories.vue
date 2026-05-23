<template>
  <section class="px-4 lg:px-6 py-2">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="cat in categories"
        :key="cat.title"
        @click="$router.push({ path: '/shop', query: { category: cat.slug } })"
        class="bg-slate-800/60 backdrop-blur-sm border border-white/5 rounded-2xl p-4 cursor-pointer hover:border-amber-400/30 hover:bg-slate-700/60 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 group"
      >
        <h3 class="text-white font-bold text-sm mb-3 group-hover:text-amber-400 transition-colors">{{ cat.title }}</h3>
        <div class="grid grid-cols-2 gap-2 mb-3">
          <div
            v-for="item in cat.items"
            :key="item.name"
            class="bg-slate-700/50 rounded-xl p-2 flex flex-col items-center gap-1.5 hover:bg-slate-600/60 transition-colors"
          >
            <span class="text-2xl">{{ item.emoji }}</span>
            <span class="text-white/60 text-[10px] text-center leading-tight">{{ item.name }}</span>
          </div>
        </div>
        <button class="text-amber-400 text-xs font-semibold hover:text-amber-300 transition-colors flex items-center gap-1 group/btn">
          {{ cat.cta }}
          <svg class="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    title: 'Get your game on',
    slug: 'gaming',
    cta: 'Shop gaming',
    items: [
      { name: 'Controllers', emoji: '🎮' },
      { name: 'Headsets', emoji: '🎧' },
      { name: 'Laptops', emoji: '💻' },
      { name: 'Chairs', emoji: '🪑' },
    ]
  },
  {
    title: 'New home under $50',
    slug: 'home',
    cta: 'Shop the latest',
    items: [
      { name: 'Kitchen', emoji: '🍳' },
      { name: 'Improvement', emoji: '🔨' },
      { name: 'Décor', emoji: '🖼️' },
      { name: 'Bedding', emoji: '🛏️' },
    ]
  },
  {
    title: 'Shop Fashion for less',
    slug: 'fashion',
    cta: 'See all deals',
    items: [
      { name: 'Jeans < $50', emoji: '👖' },
      { name: 'Tops < $25', emoji: '👕' },
      { name: 'Dresses < $30', emoji: '👗' },
      { name: 'Shoes < $50', emoji: '👟' },
    ]
  },
  {
    title: "Grilling must-haves",
    slug: 'grilling',
    cta: "Shop Father's Day",
    items: [
      { name: 'Grill Pans', emoji: '🍳' },
      { name: 'Aprons', emoji: '👨‍🍳' },
      { name: 'Tools', emoji: '🔧' },
      { name: 'Gloves', emoji: '🧤' },
    ]
  },
  {
    title: 'Top Kitchen picks',
    slug: 'kitchen',
    cta: 'Explore all Kitchen',
    items: [
      { name: 'Cooker', emoji: '🍲' },
      { name: 'Coffee', emoji: '☕' },
      { name: 'Pots', emoji: '🥘' },
      { name: 'Kettles', emoji: '🫖' },
    ]
  },
  {
    title: 'Beauty International',
    slug: 'beauty',
    cta: 'Discover more',
    items: [
      { name: 'Skincare', emoji: '🧴' },
      { name: 'Haircare', emoji: '💆' },
      { name: 'Fragrance', emoji: '🌸' },
      { name: 'Sunscreen', emoji: '🌞' },
    ]
  },
  {
    title: 'Travel Essentials',
    slug: 'travel',
    cta: 'Discover more',
    items: [
      { name: 'Backpacks', emoji: '🎒' },
      { name: 'Suitcases', emoji: '🧳' },
      { name: 'Accessories', emoji: '🔑' },
      { name: 'Handbags', emoji: '👜' },
    ]
  },
  {
    title: 'Fun with Family',
    slug: 'toys',
    cta: 'See more',
    items: [
      { name: 'Play Sets', emoji: '🛝' },
      { name: 'Learning', emoji: '📚' },
      { name: 'Action Figs', emoji: '🦸' },
      { name: 'Pretend Play', emoji: '🎭' },
    ]
  }
]
</script>