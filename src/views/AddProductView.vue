<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-2xl mx-auto p-6">
      <div class="card">
        <h1 class="text-3xl font-bold text-[#000080] mb-8">Add New Product</h1>
        <form @submit.prevent="handleSubmit">
          <input v-model="form.title" placeholder="Title *" class="input mb-4" required />
          <textarea v-model="form.description" placeholder="Description *" class="input mb-4 h-32" required></textarea>
          <input v-model="form.category" placeholder="Category *" class="input mb-4" required />
          <input v-model.number="form.price" type="number" step="0.01" placeholder="Price *" class="input mb-4" required />
          <input v-model.number="form.stock" type="number" placeholder="Stock *" class="input mb-4" required />
          <input v-model="form.thumbnail" placeholder="Thumbnail URL" class="input mb-6" />
          <button type="submit" class="btn-primary w-full" :disabled="loading">Create Product</button>
          <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const productStore = useProductStore()
const form = ref({
  title: '', description: '', category: '', price: 0, stock: 0, thumbnail: ''
})
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    await productStore.addProduct(form.value)
    router.push('/products')
  } catch (err) {
    error.value = 'Failed to add product'
  } finally {
    loading.value = false
  }
}
</script>