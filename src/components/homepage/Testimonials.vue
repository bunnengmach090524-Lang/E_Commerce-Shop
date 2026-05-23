<template>
  <section class="px-4 lg:px-6 py-4">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-white font-black text-xl" style="font-family:'Sora',sans-serif">What Customers Say</h2>
        <p class="text-white/40 text-sm">Trusted by thousands worldwide</p>
      </div>
      <div class="flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-xl px-3 py-2">
        <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span class="text-amber-400 font-bold text-sm">4.8</span>
        <span class="text-white/30 text-xs">/ 5.0</span>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-slate-800/60 backdrop-blur-sm border border-white/5 rounded-2xl p-4 hover:border-amber-400/20 hover:shadow-lg hover:shadow-black/20 transition-all duration-300 group"
      >
        <!-- Stars -->
        <div class="flex gap-0.5 mb-3">
          <svg v-for="s in 5" :key="s" class="w-3.5 h-3.5" :class="s <= review.rating ? 'text-amber-400' : 'text-white/20'" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>

        <!-- Quote -->
        <div class="text-white/10 text-5xl font-serif leading-none mb-1">"</div>
        <p class="text-white/70 text-sm leading-relaxed mb-4 -mt-3">{{ review.comment }}</p>

        <!-- User -->
        <div class="flex items-center gap-3 pt-3 border-t border-white/5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-sm font-bold text-white flex-shrink-0" :style="{ background: review.color }">
            {{ review.name[0] }}
          </div>
          <div>
            <div class="text-white text-xs font-semibold">{{ review.name }}</div>
            <div class="text-white/30 text-[10px]">{{ review.product }} · {{ review.date }}</div>
          </div>
          <svg class="w-5 h-5 text-green-400 ml-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const reviews = [
  { id: 1, name: 'Sarah K.', rating: 5, comment: 'Absolutely love shopping here! The delivery was lightning fast and everything came perfectly packaged. Will definitely order again.', product: 'Wireless Headphones', date: '2 days ago', color: 'linear-gradient(135deg,#f97316,#ea580c)' },
  { id: 2, name: 'Mike T.', rating: 5, comment: 'Best prices I have found online. The product quality exceeded my expectations and customer service was super helpful when I had questions.', product: 'Smart Watch', date: '1 week ago', color: 'linear-gradient(135deg,#7c3aed,#4c1d95)' },
  { id: 3, name: 'Ana M.', rating: 4, comment: 'Really good selection of products. Tracking was easy to follow and the return process was hassle-free when I needed to exchange a size.', product: 'Running Shoes', date: '3 days ago', color: 'linear-gradient(135deg,#059669,#065f46)' },
  { id: 4, name: 'James L.', rating: 5, comment: 'Incredible deals on electronics! Got a gaming setup for my son at a fraction of retail price. Quality is top notch.', product: 'Gaming Chair', date: '5 days ago', color: 'linear-gradient(135deg,#0ea5e9,#0369a1)' },
  { id: 5, name: 'Priya S.', rating: 5, comment: 'The fashion section is amazing. Great variety and everything fits true to size. Shipping was faster than expected!', product: 'Summer Dress', date: '1 day ago', color: 'linear-gradient(135deg,#ec4899,#be185d)' },
  { id: 6, name: 'David R.', rating: 4, comment: 'Solid e-commerce experience. Easy navigation, quick checkout and reliable shipping. My go-to for most household needs now.', product: 'Coffee Maker', date: '4 days ago', color: 'linear-gradient(135deg,#f59e0b,#b45309)' },
]
</script>