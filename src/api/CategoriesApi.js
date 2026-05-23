import api from './BaseApi.js'

const CategoriesApi = {
  // Get all category names as array of strings
  getAll() {
    return api.get('/products/categories')
  },

  // Get full category list with slug and url
  getCategoryList() {
    return api.get('/products/category-list')
  },

  // Get products belonging to a category
  getProducts(category, { limit = 20, skip = 0 } = {}) {
    return api.get(`/products/category/${encodeURIComponent(category)}`, {
      params: { limit, skip }
    })
  }
}

export default CategoriesApi