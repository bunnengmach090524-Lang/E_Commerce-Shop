<template>
  <router-link to="/" class="flex items-center gap-2 group flex-shrink-0">
    <div class="relative">
      <div class="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-amber-400/40 transition-all duration-300 group-hover:scale-105">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22" fill="none" stroke="white" stroke-width="1.5"/>
        </svg>
      </div>
      <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-300 rounded-full border-2 border-slate-900 animate-pulse"></div>
    </div>
    <div class="hidden sm:flex flex-col leading-none">
      <span class="text-white font-black text-lg tracking-tight" style="font-family:'Sora',sans-serif">ETEC</span>
      <span class="text-amber-400 text-[9px] font-semibold tracking-[0.2em] uppercase">Market</span>
    </div>
  </router-link>
</template>

<script setup></script>