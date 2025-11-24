import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'

export const useProductStore = defineStore('products', {
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
      } catch (e) {
        this.error = 'Failed to load products'
      } finally {
        this.loading = false
      }
    },
    async fetchProduct(id) {
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      return (await res.json())
    },
    async addProduct(product) {
      const auth = useAuthStore()
      const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token || 'dummy'}`
        },
        body: JSON.stringify(product)
      })
      const data = await res.json()
      this.products.unshift(data)
      return data
    },
    async deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== parseInt(id))
    }
  }
})