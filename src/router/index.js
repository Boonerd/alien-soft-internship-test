// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ProductsView from '@/views/ProductsView.vue'
import AddProductView from '@/views/AddProductView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/', redirect: '/products' },
  {
    path: '/products',
    component: ProductsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/new',
    component: AddProductView,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    component: ProductDetailView,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  // not logged in → go login
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/products')  // already logged in → go products
  } else {
    next()
  }
})

export default router
