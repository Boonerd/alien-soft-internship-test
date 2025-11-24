<template>
  <div class="p-8 max-w-4xl mx-auto">
    <button @click="$router.back()" class="text-primary font-medium mb-6">&larr; Back</button>
    <div class="card grid md:grid-cols-2 gap-10">
      <img :src="product.thumbnail" class="w-full rounded-2xl" />
      <div>
        <h1 class="text-4xl font-bold text-primary mb-4">{{ product.title }}</h1>
        <p class="text-gray-600 mb-8">{{ product.description }}</p>
        <div class="space-y-4 text-lg">
          <p><strong>Price:</strong> <span class="text-3xl text-primary font-bold">${{ product.price }}</span></p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Stock:</strong> {{ product.stock }}</p>
        </div>
        <div class="flex items-center gap-2 text-yellow-600">
          <span class="font-bold">Rating:</span> {{ product.rating }} / 5
        </div>
        <div class="text-green-600 font-bold">
          Discount: {{ product.discountPercentage }}% OFF
        </div>
        <button @click="remove" class="mt-10 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700">
          Delete Product
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const route = useRoute()
const router = useRouter()
const store = useProductStore()
const product = store.products.find(p => p.id == route.params.id)

const remove = () => {
  if (confirm('Delete this product?')) {
    store.deleteProduct(product.id)
    router.push('/products')
  }
}
</script>
