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
      this.loading = true
      try {
        const res = await fetch('https://dummyjson.com/products')
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

        // THIS LINE MAKES IT APPEAR INSTANTLY
        this.products.unshift(newProduct)

        return newProduct
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id) {
      const auth = useAuthStore()
      await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      this.products = this.products.filter(p => p.id !== id)
    }
  }
})
