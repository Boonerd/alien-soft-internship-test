<template>
  <div class="min-h-screen bg-gray-50">
    <nav v-if="auth.isAuthenticated" class="bg-[#000080] text-white p-4 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">AlienSoft Products</h1>
        <button @click="auth.logout(); $router.push('/login')" class="btn-primary bg-white text-[#000080]">
          Logout
        </button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
</script>