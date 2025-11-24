<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-primary">Products</h1>
      <router-link to="/products/new" class="btn-primary">Add New Product</router-link>
    </div>

    <input v-model="search" placeholder="Search by title..." class="input mb-8" />

    <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left">Image</th>
            <th class="px-6 py-4 text-left">Title</th>
            <th class="px-6 py-4 text-left">Category</th>
            <th class="px-6 py-4 text-left">Price</th>
            <th class="px-6 py-4 text-left">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filtered" :key="p.id" @click="$router.push('/products/'+p.id)" class="border-b hover:bg-gray-50 cursor-pointer">
            <td class="px-6 py-4"><img :src="p.thumbnail" class="w-16 h-16 rounded-full object-cover" /></td>
            <td class="px-6 py-4 font-semibold">{{ p.title }}</td>
            <td class="px-6 py-4">{{ p.category }}</td>
            <td class="px-6 py-4 font-bold text-primary">${{ p.price }}</td>
            <td class="px-6 py-4">{{ p.stock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()
const search = ref('')

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts()
  }
})

const filtered = computed(() =>
  store.products.filter(p => p.title.toLowerCase().includes(search.value.toLowerCase()))
)
</script>
