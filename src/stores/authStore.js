import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserApi from '@/api/UserApi.js'

export const useAuthStore = defineStore('auth', () => {
  const user  = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error   = ref(null)

  const isLoggedIn = computed(() => !!token.value)
  const userName   = computed(() => user.value ? `${user.value.firstName}` : 'Sign In')

  async function login(username, password) {
    loading.value = true
    error.value   = null
    try {
      const data = await UserApi.login(username, password)
      token.value = data.token
      user.value  = data
      localStorage.setItem('token', data.token)
      return true
    } catch (e) {
      error.value = 'Invalid username or password'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value  = null
    token.value = null
    localStorage.removeItem('token')
  }

  async function fetchMe() {
    if (!token.value) return
    try {
      user.value = await UserApi.getMe()
    } catch {
      logout()
    }
  }

  return { user, token, loading, error, isLoggedIn, userName, login, logout, fetchMe }
})