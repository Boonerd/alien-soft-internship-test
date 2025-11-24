<template>
  <div class="p-8 max-w-2xl mx-auto">
    <div class="card">
      <h2 class="text-3xl font-bold text-primary mb-8">Add New Product</h2>
      <form @submit.prevent="add">
        <input v-model="form.title" placeholder="Title" class="input mb-4" required />
        <textarea v-model="form.description" placeholder="Description" class="input mb-4 h-32" required></textarea>
        <input v-model="form.category" placeholder="Category" class="input mb-4" required />
        <input v-model.number="form.price" type="number" placeholder="Price" class="input mb-4" required />
        <input v-model.number="form.stock" type="number" placeholder="Stock" class="input mb-4" required />
        <input v-model="form.thumbnail" placeholder="Thumbnail URL" class="input mb-6" />
        <button type="submit" class="btn-primary w-full">Create Product</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const store = useProductStore()
const form = ref({ title: '', description: '', category: '', price: 0, stock: 0, thumbnail: '' })

const add = () => {
  store.addProduct({ ...form.value, id: Date.now() })
  router.push('/products')
}
</script>
