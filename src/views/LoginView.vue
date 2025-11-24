<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="card w-full max-w-md">
      <h2 class="text-3xl font-bold text-primary text-center mb-8">AlienSoft Login</h2>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" class="input mb-4" required />
        <input v-model="password" type="password" placeholder="Password" class="input mb-6" required />
        <button type="submit" class="btn-primary w-full">Login</button>
        <p v-if="error" class="text-red-600 text-center mt-4">{{ error }}</p>
        <p class="text-xs text-gray-500 text-center mt-4">Try: kminchelle / 0lelplR</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const username = ref('kminchelle')
const password = ref('0lelplR')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

const login = async () => {
  try {
    await auth.login({ username: username.value, password: password.value })
    router.push('/products')
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    error.value = 'Invalid credentials'
  }
}
</script>
