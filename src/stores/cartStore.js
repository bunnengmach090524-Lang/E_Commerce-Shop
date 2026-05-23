import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isDrawerOpen = ref(false)

  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
  const subtotal = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

  function addToCart(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }
    isDrawerOpen.value = true
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function updateQty(id, qty) {
    if (qty < 1) { removeItem(id); return }
    const item = items.value.find(i => i.id === id)
    if (item) item.qty = qty
  }

  function clearCart() {
    items.value = []
  }

  function openDrawer() { isDrawerOpen.value = true }
  function closeDrawer() { isDrawerOpen.value = false }

  return { items, isDrawerOpen, totalItems, subtotal, addToCart, removeItem, updateQty, clearCart, openDrawer, closeDrawer }
})