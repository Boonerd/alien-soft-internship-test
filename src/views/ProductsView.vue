<template>
  <AppLayout>
    <div>
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Products</h1>
          <p class="text-gray-600">Manage your inventory and view product performance.</p>
        </div>
        <router-link to="/products/new" class="bg-[#000080] text-white px-6 py-4 rounded-lg font-bold hover:bg-[#000060 flex items-center gap-2">
          Add New Product
        </router-link>
      </div>

      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="p-6 border-b">
          <input v-model="search" placeholder="Search by product name..." class="w-full px-5 py-4 border rounded-xl focus:outline-none focus:border-[#000080]" />
        </div>

        <div class="divide-y">
          <div v-for="p in filtered" :key="p.id" @click="$router.push('/products/'+p.id)" class="p-6 hover:bg-gray-50 cursor-pointer flex items-center gap-6">
            <img :src="p.thumbnail" class="w-20 h-20 rounded-xl object-cover" />
            <div class="flex-1">
              <h3 class="font-bold text-lg">{{ p.title }}</h3>
              <p class="text-gray-600 text-sm line-clamp-2">{{ p.description }}</p>
            </div>
            <div class="text-right">
              <span class="block font-bold text-2xl text-[#000080]">KSh {{ p.price }}</span>
              <span :class="p.stock > 50 ? 'text-green-600' : p.stock > 0 ? 'text-orange-600' : 'text-red-600'" class="text-sm font-medium">
                {{ p.stock > 50 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock' }} • {{ p.stock }} units
              </span>
            </div>
          </div>
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

onMounted(() => {
  if (store.products.length === 0) store.fetchProducts()
})

const filtered = computed(() =>
  store.products.filter(p => p.title.toLowerCase().includes(search.value.toLowerCase()))
)
</script>
