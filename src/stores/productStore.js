import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      const res = await fetch('https://dummyjson.com/products')
      const data = await res.json()
      this.products = data.products
      this.loading = false
    },
    addProduct(product) {
      this.products.unshift({ ...product, id: Date.now() })
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
    }
  }
})
