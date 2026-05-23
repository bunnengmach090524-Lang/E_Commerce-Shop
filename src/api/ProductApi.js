import api from './BaseApi.js'

const ProductApi = {
  // Get all products with pagination
  // Returns: { products, total, skip, limit }
  getAll({ limit = 20, skip = 0, select = '' } = {}) {
    const params = { limit, skip }
    if (select) params.select = select
    return api.get('/products', { params })
  },

  // Get single product by ID
  getById(id) {
    return api.get(`/products/${id}`)
  },

  // Search products by query string
  // Returns: { products, total, skip, limit }
  search(q, { limit = 20, skip = 0 } = {}) {
    return api.get('/products/search', { params: { q, limit, skip } })
  },

  // Get all products in a category
  getByCategory(category, { limit = 20, skip = 0 } = {}) {
    return api.get(`/products/category/${encodeURIComponent(category)}`, { params: { limit, skip } })
  },

  // Sort products
  // sortBy: 'price' | 'rating' | 'title'
  // order: 'asc' | 'desc'
  getSorted({ sortBy = 'price', order = 'asc', limit = 20, skip = 0 } = {}) {
    return api.get('/products', { params: { sortBy, order, limit, skip } })
  },

  // Get featured/best sellers (sorted by rating desc)
  getFeatured(limit = 8) {
    return api.get('/products', { params: { limit, sortBy: 'rating', order: 'desc' } })
  },

  // Get new arrivals (latest by id desc)
  getNewArrivals(limit = 8) {
    return api.get('/products', { params: { limit, skip: 80, sortBy: 'id', order: 'desc' } })
  },

  // Get flash sale deals (highest discount)
  getFlashSale(limit = 10) {
    return api.get('/products', { params: { limit, sortBy: 'discountPercentage', order: 'desc' } })
  },
}

export default ProductApi