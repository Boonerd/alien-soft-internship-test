<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto p-6">
      <button @click="$router.back()" class="text-[#000080] mb-6 font-medium">&larr; Back to Products</button>
      <div v-if="loading" class="text-center py-10">Loading...</div>
      <div v-else class="card">
        <div class="grid md:grid-cols-2 gap-8">
          <img :src="product.thumbnail" class="w-full rounded-lg" :alt="product.title" />
          <div>
            <h1 class="text-3xl font-bold text-[#000080] mb-4">{{ product.title }}</h1>
            <p class="text-gray-600 mb-6">{{ product.description }}</p>
            <div class="space-y-3 mb-8">
              <p><strong>Category:</strong> {{ product.category }}</p>
              <p><strong>Price:</strong> <span class="text-2xl text-[#000080]">${{ product.price }}</span></p>
              <p><strong>Stock:</strong> {{ product.stock }}</p>
              <p v-if="product.rating"><strong>Rating:</strong> {{ product.rating }}/5</p>
            </div>
            <button @click="confirmDelete" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">Delete Product</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const product = ref({})
const loading = ref(true)

onMounted(async () => {
  product.value = await productStore.fetchProductById(route.params.id)
  loading.value = false
})

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this product?')) {
    productStore.deleteProduct(route.params.id)
    router.push('/products')
  }
}
</script>