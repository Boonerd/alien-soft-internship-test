import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login({ username, password }) {
      // This is the ONLY way that works in 2025 with Vite dev server
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        // Remove credentials: 'include' → causes CORS block in dev
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials')
      }

      // DummyJSON returns token in response body (not cookie anymore in dev)
      this.token = data.token
      this.user = data
    },
    logout() {
      this.token = null
      this.user = null
    }
  },
  persist: true  // Saves to localStorage → survives refresh
})
