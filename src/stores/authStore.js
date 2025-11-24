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
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30  // Optional, as per docs (defaults to 60)
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials')
      }

      this.token = data.accessToken  // Correct field from docs
      this.user = data
    },
    logout() {
      this.token = null
      this.user = null
    }
  },
  persist: true  // Saves to localStorage
})
