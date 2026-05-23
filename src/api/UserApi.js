import api from './BaseApi.js'

const UserApi = {
  // Login — returns { token, id, username, email, firstName, lastName, image }
  // Test credentials: username: 'emilys', password: 'emilyspass'
  login(username, password) {
    return api.post('/auth/login', {
      username,
      password,
      expiresInMins: 60
    })
  },

  // Get current user profile (needs token)
  getMe() {
    return api.get('/auth/me')
  },

  // Get user by ID
  getById(id) {
    return api.get(`/users/${id}`)
  },

  // Get all users
  getAll({ limit = 10, skip = 0 } = {}) {
    return api.get('/users', { params: { limit, skip } })
  },

  // Search users
  search(q) {
    return api.get('/users/search', { params: { q } })
  },

  // Get user's cart
  getCart(userId) {
    return api.get(`/carts/user/${userId}`)
  }
}

export default UserApi