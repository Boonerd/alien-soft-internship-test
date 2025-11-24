// src/stores/productStore.js
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchProducts() {
      // Only fetch if we have NO products (prevents overwriting added ones)
      if (this.products.length > 0) return

      this.loading = true
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100')
        const data = await res.json()
        this.products = data.products
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async addProduct(productData) {
      this.loading = true
      try {
        const auth = useAuthStore()
        const res = await fetch('https://dummyjson.com/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
          },
          body: JSON.stringify(productData)
        })
        const newProduct = await res.json()

        // This line makes it stay forever
        this.products.unshift(newProduct)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
    }
  },
  persist: true  // ← THIS SAVES YOUR ADDED PRODUCTS TO BROWSER STORAGE
})
