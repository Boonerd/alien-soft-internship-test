<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h2 class="text-3xl font-bold text-[#000080] text-center mb-10">Add New Product</h2>

        <form @submit.prevent="add" class="space-y-6">
          <input
            v-model="form.title"
            placeholder="Product Title"
            class="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-[#000080] focus:outline-none text-base"
            required
          />

          <textarea
            v-model="form.description"
            placeholder="Description"
            class="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-[#000080] focus:outline-none text-base h-32 resize-none"
            required
          ></textarea>

          <input
            v-model="form.category"
            placeholder="Category (e.g. beauty, electronics)"
            class="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-[#000080] focus:outline-none text-base"
            required
          />

          <!-- PRICE WITH KSh LABEL -->
          <div class="relative">
            <span class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">USD</span>
            <input
              v-model.number="form.price"
              type="number"
              placeholder="Price"
              class="w-full pl-16 pr-5 py-4 rounded-lg border border-gray-300 focus:border-[#000080] focus:outline-none text-base"
              required
            />
          </div>

          <!-- STOCK WITH Qty LABEL -->
          <div class="relative">
            <span class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">Qty</span>
            <input
              v-model.number="form.stock"
              type="number"
              placeholder="Stock Quantity"
              class="w-full pl-16 pr-5 py-4 rounded-lg border border-gray-300 focus:border-[#000080] focus:outline-none text-base"
              required
            />
          </div>

          <input
            v-model="form.thumbnail"
            placeholder="Thumbnail URL (optional)"
            class="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-[#000080] focus:outline-none text-base"
          />

          <button
            type="submit"
            class="w-full bg-[#000080] text-white font-bold py-4 rounded-lg hover:bg-[#000060] transition text-lg shadow-md"
          >
            Create Product
          </button>
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
const store = useProductStore()

const form = ref({
  title: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
})

const add = async () => {
  await store.addProduct(form.value)
  router.push('/products')
}
</script>
