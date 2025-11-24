<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- SIDEBAR WITH SVG LOGO -->
    <aside class="w-64 bg-[#000080] text-white flex flex-col">
      <div class="p-8">
        <div class="flex items-center gap-3">
          <!-- ALIENSOFT SVG LOGO -->
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="20" fill="white" opacity="0.2"/>
            <path d="M24 8L30.9282 18.5H17.0718L24 8Z" fill="white"/>
            <path d="M24 40L17.0718 29.5H30.9282L24 40Z" fill="white"/>
            <circle cx="24" cy="24" r="8" fill="white"/>
          </svg>
          <h1 class="text-2xl font-bold">AlienSoft</h1>
        </div>
      </div>

      <nav class="flex-1 px-6">
        <router-link to="/" class="flex items-center gap-4 px-4 py-4 rounded-lg bg-white/10 mb-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Dashboard
        </router-link>
        <router-link to="/products" class="flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-white/10 mb-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          Products
        </router-link>
      </nav>

      <div class="p-6">
        <button @click="logout" class="w-full bg-white/10 hover:bg-white/20 py-4 rounded-lg font-medium transition">
          Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
const router = useRouter()
const auth = useAuthStore()
const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>
