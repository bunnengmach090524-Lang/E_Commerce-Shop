<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" @click.self="close" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 class="text-slate-900 font-bold text-lg">Choose your location</h2>
            <button @click="close" class="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-5 py-5 space-y-4">
            <p class="text-gray-500 text-sm leading-relaxed">Delivery options and delivery speeds may vary for different locations.</p>

            <!-- Sign in button -->
            <button @click="$router.push('/signin'); close()" class="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm rounded-full transition-all hover:shadow-lg hover:shadow-amber-400/30 hover:scale-[1.02]">
              Sign in to see your addresses
            </button>

            <!-- Divider -->
            <div class="flex items-center gap-3">
              <div class="flex-1 h-px bg-gray-200"></div>
              <span class="text-gray-400 text-xs">or enter a US zip code</span>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>

            <!-- Zip code input -->
            <div class="flex gap-2">
              <input
                v-model="zipCode"
                type="text"
                placeholder=""
                maxlength="5"
                class="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl text-slate-900 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
              />
              <button class="px-4 py-2.5 border border-gray-300 rounded-xl text-slate-800 text-sm font-semibold hover:bg-gray-50 transition-all">
                Apply
              </button>
            </div>

            <!-- Divider -->
            <div class="flex items-center gap-3">
              <div class="flex-1 h-px bg-gray-200"></div>
              <span class="text-gray-400 text-xs">or ship outside the US</span>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>

            <!-- Country dropdown -->
            <select v-model="selectedCountry" class="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-slate-800 text-sm outline-none focus:border-amber-400 transition-all bg-white cursor-pointer">
              <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>

          <!-- Footer -->
          <div class="flex justify-end px-5 pb-5">
            <button @click="applyLocation" class="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm rounded-full transition-all hover:scale-105">
              Done
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close', 'apply'])

const zipCode = ref('')
const selectedCountry = ref('Cambodia')

function close() { emit('close') }
function applyLocation() { emit('apply', { country: selectedCountry.value, zip: zipCode.value }); close() }

const countries = [
  'Cambodia', 'United States', 'United Kingdom', 'Australia', 'Canada',
  'Germany', 'France', 'Japan', 'Singapore', 'Thailand', 'Vietnam',
  'Philippines', 'Indonesia', 'Malaysia', 'India', 'China', 'South Korea',
  'United Arab Emirates', 'Saudi Arabia', 'Brazil', 'Mexico'
]
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active > div, .modal-leave-active > div { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1); }
.modal-enter-from > div { transform: scale(0.95) translateY(-10px); }
.modal-leave-to > div { transform: scale(0.95); }
</style>