<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
      <h2 class="text-4xl font-bold text-[#000080] text-center mb-10">AlienSoft Login</h2>

      <form @submit.prevent="login" class="space-y-6">
        <input
          v-model="username"
          placeholder="Username"
          class="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-[#000080] focus:outline-none text-lg transition"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-[#000080] focus:outline-none text-lg transition"
          required
        />

        <button
          type="submit"
          class="w-full bg-[#000080] text-white py-5 rounded-xl font-bold text-xl hover:bg-[#000060] transition shadow-lg"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <p v-if="error" class="text-red-600 text-center font-semibold text-lg">{{ error }}</p>

        <!-- Hidden hint for you only -->
        <div class="text-xs text-gray-500 text-center mt-8 space-y-1">
          <p>Hint (for testing):</p>
          <p>emilys → emilyspass</p>
          <p>michaelw → michaelwpass</p>
          <p>sophiab → sophiabpass</p>
          <p>jamesd → jamesdpass</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const username = ref('emilys')
const password = ref('emilyspass')
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
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
