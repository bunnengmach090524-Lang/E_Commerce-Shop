<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <!-- Logo -->
    <div class="flex justify-center pt-8 pb-4">
      <router-link to="/" class="flex items-center gap-2">
        <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        </div>
        <span class="text-slate-900 font-black text-2xl" style="font-family:'Sora',sans-serif">Shopy</span>
      </router-link>
    </div>

    <!-- Card -->
    <div class="flex-1 flex items-start justify-center px-4 pb-10">
      <div class="w-full max-w-sm">
        <div class="bg-white border border-gray-200 rounded-2xl px-7 py-7 shadow-sm">

          <!-- Title -->
          <h1 class="text-slate-900 font-bold text-xl mb-5">Sign in or create account</h1>

          <!-- Step 1: Email/Phone -->
          <div v-if="step === 1" class="space-y-4">
            <div>
              <label class="block text-slate-800 font-semibold text-sm mb-1.5">Enter mobile number or email</label>
              <input
                v-model="emailOrPhone"
                type="text"
                autofocus
                @keyup.enter="nextStep"
                class="w-full px-3 py-2.5 border-2 rounded-xl text-slate-900 text-sm outline-none transition-all"
                :class="emailError ? 'border-red-400 focus:border-red-400' : 'border-slate-300 focus:border-amber-400'"
                placeholder=""
              />
              <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
            </div>

            <button
              @click="nextStep"
              class="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm rounded-full transition-all hover:shadow-md hover:scale-[1.01]"
            >
              Continue
            </button>

            <p class="text-gray-500 text-xs leading-relaxed text-center">
              By continuing, you agree to Shopy's
              <a href="#" class="text-blue-600 hover:underline">Conditions of Use</a>
              and
              <a href="#" class="text-blue-600 hover:underline">Privacy Notice</a>.
            </p>

            <button class="text-blue-600 hover:underline text-sm text-center w-full">Need help?</button>

            <div class="border-t border-gray-200 pt-4">
              <p class="text-slate-800 font-bold text-sm mb-1">Buying for work?</p>
              <a href="#" class="text-blue-600 hover:underline text-sm">Create a free business account</a>
            </div>
          </div>

          <!-- Step 2: Password -->
          <div v-else-if="step === 2" class="space-y-4">
            <div class="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span class="font-medium">{{ emailOrPhone }}</span>
              <button @click="step = 1" class="ml-auto text-blue-600 hover:underline text-xs">Change</button>
            </div>

            <div>
              <label class="block text-slate-800 font-semibold text-sm mb-1.5">Password</label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPw ? 'text' : 'password'"
                  @keyup.enter="handleSignIn"
                  autofocus
                  class="w-full px-3 py-2.5 border-2 rounded-xl text-slate-900 text-sm outline-none transition-all pr-10"
                  :class="pwError ? 'border-red-400' : 'border-slate-300 focus:border-amber-400'"
                />
                <button @click="showPw = !showPw" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg v-if="!showPw" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
                </button>
              </div>
              <p v-if="pwError" class="text-red-500 text-xs mt-1">{{ pwError }}</p>
            </div>

            <button
              @click="handleSignIn"
              :disabled="signingIn"
              class="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm rounded-full transition-all hover:shadow-md hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="signingIn" class="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
              {{ signingIn ? 'Signing in…' : 'Sign in' }}
            </button>

            <a href="#" class="block text-center text-blue-600 hover:underline text-sm">Forgot your password?</a>
          </div>

          <!-- Step 3: Success -->
          <div v-else class="text-center py-4 space-y-4">
            <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div>
              <h2 class="text-slate-900 font-bold text-lg">Welcome back!</h2>
              <p class="text-gray-500 text-sm">Signed in as {{ emailOrPhone }}</p>
            </div>
            <button @click="$router.push('/')" class="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm rounded-full transition-all">
              Continue Shopping
            </button>
          </div>
        </div>

        <!-- Create account -->
        <div v-if="step < 3" class="mt-4 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-slate-50 px-3 text-gray-400 text-xs">New to Shopy?</span>
          </div>
        </div>
        <div v-if="step < 3" class="mt-4">
          <button @click="$router.push('/signup')" class="w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-slate-800 font-semibold text-sm rounded-full transition-all hover:border-gray-400">
            Create your Shopy account
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-gray-200 bg-white">
      <div class="max-w-screen-md mx-auto px-4 py-4 flex flex-wrap justify-center gap-x-5 gap-y-1">
        <a v-for="link in footerLinks" :key="link" href="#" class="text-blue-600 hover:underline text-xs">{{ link }}</a>
      </div>
      <p class="text-center text-gray-400 text-xs pb-4">© 1996–2025, Shopy Market, Inc. or its affiliates</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const step = ref(1)
const emailOrPhone = ref('')
const password = ref('')
const showPw = ref(false)
const emailError = ref('')
const pwError = ref('')
const signingIn = ref(false)

function nextStep() {
  emailError.value = ''
  if (!emailOrPhone.value.trim()) {
    emailError.value = 'Enter your email or mobile phone number'
    return
  }
  step.value = 2
}

async function handleSignIn() {
  pwError.value = ''
  if (!password.value) { pwError.value = 'Enter your password'; return }
  signingIn.value = true
  await new Promise(r => setTimeout(r, 1200))
  signingIn.value = false
  step.value = 3
}

const footerLinks = ['Conditions of Use', 'Privacy Notice', 'Help']
</script>