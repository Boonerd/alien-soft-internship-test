<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-[#000080]">Products</h1>
        <router-link to="/products/new" class="btn-primary">Add New Product</router-link>
      </div>

      <input v-model="search" placeholder="Search by title..." class="input mb-6" />

      <div v-if="store.loading" class="text-center py-10">Loading products...</div>
      <div v-else-if="store.error" class="text-red-500 text-center">{{ store.error }}</div>
      <div v-else class="overflow-x-auto bg-white rounded-xl shadow">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-4 text-left">Image</th>
              <th class="px-6 py-4 text-left">Title & Description</th>
              <th class="px-6 py-4 text-left">Category</th>
              <th class="px-6 py-4 text-left">Price</th>
              <th class="px-6 py-4 text-left">Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in filteredProducts" :key="p.id" @click="goTo(p.id)" class="table-row">
              <td class="px-6 py-4"><img :src="p.thumbnail" class="w-16 h-16 rounded-full object-cover" /></td>
              <td class="px-6 py-4">
                <div class="font-semibold">{{ p.title }}</div>
                <div class="text-gray-500 text-sm">{{ p.description.substring(0, 90) + '...' }}</div>
              </td>
              <td class="px-6 py-4">{{ p.category }}</td>
              <td class="px-6 py-4 font-medium">${{ p.price }}</td>
              <td class="px-6 py-4">{{ p.stock }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()
const router = useRouter()
const search = ref('')

onMounted(() => store.fetchProducts())

const filteredProducts = computed(() =>
  store.products.filter(p => p.title.toLowerCase().includes(search.value.toLowerCase()))
)

const goTo = (id) => router.push(`/products/${id}`)
</script>