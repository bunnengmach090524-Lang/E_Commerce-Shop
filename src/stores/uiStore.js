import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const showLocationModal = ref(false)
  const showAccountDropdown = ref(false)

  function openLocation() { showLocationModal.value = true }
  function closeLocation() { showLocationModal.value = false }
  function openAccount() { showAccountDropdown.value = true }
  function closeAccount() { showAccountDropdown.value = false }
  function toggleAccount() { showAccountDropdown.value = !showAccountDropdown.value }

  return { showLocationModal, showAccountDropdown, openLocation, closeLocation, openAccount, closeAccount, toggleAccount }
})