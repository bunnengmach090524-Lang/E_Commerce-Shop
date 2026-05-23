import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Shop from '@/pages/Shop.vue'
import ProductDetail from '@/pages/ProductDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router