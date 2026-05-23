<template>
  <div class="min-h-screen bg-slate-900">
    <HeroBanner />
    <Categories />
    <Flashsale />
    <FeaturedProducts />
    <NewArrivals />
    <Testimonials />
    <NewsLetter />

    <!-- Footer -->
    <footer class="mt-8 border-t border-white/5">
      <!-- Links -->
      <div class="max-w-screen-2xl mx-auto px-4 lg:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div v-for="col in footerLinks" :key="col.title">
          <h4 class="text-white font-bold text-sm mb-4">{{ col.title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in col.links" :key="link">
              <a href="#" class="text-white/40 text-xs hover:text-white transition-colors">{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-white/5 py-6 px-4 lg:px-6">
        <div class="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            </div>
            <span class="text-white font-bold text-sm" style="font-family:'Sora',sans-serif">ETEC Market</span>
          </div>
          <div class="flex items-center gap-4">
            <button class="px-3 py-1 bg-slate-800 border border-white/10 text-white/60 text-xs rounded-lg hover:text-white transition-colors">🌐 English</button>
            <button class="px-3 py-1 bg-slate-800 border border-white/10 text-white/60 text-xs rounded-lg hover:text-white transition-colors">🇺🇸 United States</button>
          </div>
          <p class="text-white/20 text-xs">© 2025 Shopy Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import HeroBanner from '@/components/homepage/HeroBanner.vue'
import Categories from '@/components/homepage/Categories.vue'
import Flashsale from '@/components/homepage/Flashsale.vue'
import FeaturedProducts from '@/components/homepage/FeaturedProducts.vue'
import NewArrivals from '@/components/homepage/NewArrivals.vue'
import Testimonials from '@/components/homepage/Testimonials.vue'
import NewsLetter from '@/components/homepage/NewsLetter.vue'

const footerLinks = [
  { title: 'Get to Know Us', links: ['Careers', 'Blog', 'About Shopy', 'Investor Relations', 'Our Devices'] },
  { title: 'Make Money with Us', links: ['Sell products', 'Sell on Business', 'Become Affiliate', 'Advertise Products', 'Self-Publish'] },
  { title: 'Payment Products', links: ['Business Card', 'Shop with Points', 'Reload Balance', 'Currency Converter'] },
  { title: 'Let Us Help You', links: ['Your Account', 'Your Orders', 'Shipping Rates', 'Returns', 'Customer Service'] },
]
</script>