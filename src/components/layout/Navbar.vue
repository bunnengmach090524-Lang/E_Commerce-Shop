<template>
  <header class="sticky top-0 z-40">
    <!-- Top bar -->
    <div class="bg-slate-900 border-b border-white/5">
      <div class="max-w-screen-2xl mx-auto px-4 h-14 flex items-center gap-3">
        <!-- Logo -->
        <NavLogo />

        <!-- Location pill (hidden on mobile) -->
        <button class="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all duration-200 flex-shrink-0 group">
          <svg class="w-4 h-4 text-white/50 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <div class="flex flex-col leading-none">
            <span class="text-white/40 text-[9px]">Deliver to</span>
            <span class="text-white text-xs font-semibold group-hover:text-amber-400 transition-colors">Cambodia</span>
          </div>
        </button>

        <!-- Search -->
        <SearchBar class="flex-1" />

        <!-- Language -->
        <button class="hidden lg:flex items-center gap-1 text-white/60 hover:text-white text-xs px-2 py-1 rounded-lg hover:bg-white/10 transition-all flex-shrink-0">
          <span class="text-base">🇺🇸</span>
          <span>EN</span>
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 8l4.5 4.5L14.5 8"/></svg>
        </button>

        <!-- Nav Actions -->
        <NavActions />
      </div>
    </div>

    <!-- Bottom nav with menu -->
    <DesktopMenu />
  </header>
</template>

<script setup>
import NavLogo from './NavLogo.vue'
import SearchBar from './SearchBar.vue'
import NavActions from './NavActions.vue'
import DesktopMenu from './DesktopMenu.vue'
</script>