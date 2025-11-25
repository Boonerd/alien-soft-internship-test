<template>
  <AppLayout>
    <div class="max-w-7xl mx-auto px-4 py-8 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Products</h1>
          <p class="text-gray-600 mt-1">Manage your inventory and view product performance.</p>
        </div>

      </div>

      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative max-w-xl">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search by product name..."
            class="w-full pl-12 pr-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-[#000080]"
          />
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="product in paginatedProducts"
              :key="product.id"
              class="hover:bg-gray-50 cursor-pointer transition"
              @click="$router.push(`/products/${product.id}`)"
            >
              <td class="px-6 py-5">
                <div class="flex items-center gap-4">
                  <img :src="product.thumbnail" alt="" class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200" />
                  <div>
                    <div class="font-medium text-gray-900">{{ product.title }}</div>
                    <div class="text-sm text-gray-500 mt-1 line-clamp-2">{{ product.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5">
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-5 font-semibold text-gray-900">
                ${{ product.price }}
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-2">
                  <span
                    class="px-3 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': product.stock > 20,
                      'bg-orange-100 text-orange-800': product.stock > 0 && product.stock <= 20,
                      'bg-red-100 text-red-800': product.stock === 0
                    }"
                  >
                    {{ product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock' }}
                  </span>
                  <span class="text-sm text-gray-500">{{ product.stock }} units</span>
                </div>
              </td>
              <td class="px-6 py-5 text-right">
                <button
                  @click.stop="$router.push(`/products/${product.id}`)"
                  class="text-[#000080] hover:text-[#000060] font-medium text-sm"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-8 flex justify-between items-center">
        <div class="text-sm text-gray-600">
          Showing {{ startIndex }} to {{ endIndex }} of {{ filteredProducts.length }} results
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            ← Previous
          </button>
          <span class="text-sm font-medium text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import AppLayout from '@/components/AppLayout.vue'

const store = useProductStore()
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

onMounted(() => {
  if (store.products.length === 0) store.fetchProducts()
})

const filteredProducts = computed(() => {
  return store.products.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase()) ||
    p.description.toLowerCase().includes(search.value.toLowerCase())
  )
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage + 1)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage, filteredProducts.value.length))
</script>
