<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Add New Product</h1>
      <p class="text-gray-600 mb-10">Enter the details below to add a new item to your inventory.</p>

      <div class="bg-white rounded-2xl shadow-sm p-10 space-y-8">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
          <input v-model="form.title" placeholder="e.g. Wireless Headphones" class="w-full px-5 py-4 border rounded-xl focus:outline-none focus:border-[#000080]" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
          <textarea v-model="form.description" rows="4" placeholder="Provide a detailed description..." class="w-full px-5 py-4 border rounded-xl focus:outline-none focus:border-[#000080]" required></textarea>
        </div>

        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Price $</label>
            <input v-model.number="form.price" type="number" placeholder="2499" class="w-full px-5 py-4 border rounded-xl focus:outline-none focus:border-[#000080]" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
            <input v-model.number="form.stock" type="number" placeholder="150" class="w-full px-5 py-4 border rounded-xl focus:outline-none focus:border-[#000080]" required />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <input v-model="form.category" placeholder="e.g. electronics, beauty" class="w-full px-5 py-4 border rounded-xl focus:outline-none focus:border-[#000080]" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL (optional)</label>
          <input v-model="form.thumbnail" placeholder="https://..." class="w-full px-5 py-4 border rounded-xl focus:outline-none focus:border-[#000080]" />
        </div>

        <div class="flex justify-end gap-4 pt-6">
          <router-link to="/products" class="px-8 py-4 border rounded-lg hover:bg-gray-50 font-medium">Cancel</router-link>
          <button @click="save" class="bg-[#000080] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#000060] transition">
            Save Product
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import AppLayout from '@/components/AppLayout.vue'

const router = useRouter()
const store = useProductStore()

const form = ref({
  title: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
})

const save = async () => {
  await store.addProduct({ ...form.value })
  router.push('/products')
}
</script>
