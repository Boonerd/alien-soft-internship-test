import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: '', user: null }),
  getters: { isAuthenticated: state => !!state.token },
  actions: {
    async login({ username, password }) {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      this.token = data.token
      this.user = data
    },
    logout() { this.token = ''; this.user = null }
  },
  persist: true
})