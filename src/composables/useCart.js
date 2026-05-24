import { reactive, computed } from 'vue'

const state = reactive({
  items: [],
  isOpen: false,
})

export function useCart() {
  const cartCount = computed(() => state.items.reduce((sum, i) => sum + i.qty, 0))
  const cartTotal = computed(() => state.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2))
  const cartItems = computed(() => state.items)
  const isOpen = computed(() => state.isOpen)

  function addToCart(product) {
    const existing = state.items.find(i => i.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      state.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
        discountPercentage: product.discountPercentage,
        qty: 1,
      })
    }
    state.isOpen = true
  }

  function removeItem(id) {
    const idx = state.items.findIndex(i => i.id === id)
    if (idx > -1) state.items.splice(idx, 1)
  }

  function updateQty(id, qty) {
    const item = state.items.find(i => i.id === id)
    if (item) {
      if (qty <= 0) removeItem(id)
      else item.qty = qty
    }
  }

  function clearCart() { state.items = [] }
  function openCart() { state.isOpen = true }
  function closeCart() { state.isOpen = false }

  return { cartItems, cartCount, cartTotal, isOpen, addToCart, removeItem, updateQty, clearCart, openCart, closeCart }
}