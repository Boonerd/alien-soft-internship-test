<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="card w-full max-w-md">
      <h1 class="text-3xl font-bold text-primary text-center mb-8">AlienSoft Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <input v-model="username" placeholder="Username" class="input" required />
        </div>
        <div class="mb-6">
          <input v-model="password" type="password" placeholder="Password" class="input" required />
        </div>
        <button type="submit" class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
        <p class="text-sm text-gray-600 text-center mt-4">
          Try: <strong>kminchelle</strong> / <strong>0lelplR</strong>
        </p>
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
const loading = ref(false)
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

const login = async () => {
  loading.value = true
  error.value = ''
  try {
    await auth.login({ username: username.value, password: password.value })
    router.push('/products')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>