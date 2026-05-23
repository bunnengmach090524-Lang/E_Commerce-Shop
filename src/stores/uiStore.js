import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const showLocationModal    = ref(false)
  const showAccountDropdown  = ref(false)
  const showMegaMenu         = ref(false)

  function openLocation()   { showLocationModal.value = true }
  function closeLocation()  { showLocationModal.value = false }
  function openAccount()    { showAccountDropdown.value = true }
  function closeAccount()   { showAccountDropdown.value = false }
  function openMegaMenu()   { showMegaMenu.value = true }
  function closeMegaMenu()  { showMegaMenu.value = false }

  return {
    showLocationModal, showAccountDropdown, showMegaMenu,
    openLocation, closeLocation, openAccount, closeAccount, openMegaMenu, closeMegaMenu
  }
})