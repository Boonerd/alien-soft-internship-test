import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  { path: '/login', component: () => import('../views/LoginView.vue') },
  { path: '/', redirect: '/products' },
  { path: '/products', component: () => import('../views/ProductsView.vue'), meta: { requiresAuth: true } },
  { path: '/products/new', component: () => import('../views/AddProductView.vue'), meta: { requiresAuth: true } },
  { path: '/products/:id', component: () => import('../views/ProductDetailView.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && auth.isAuthenticated) {
    next('/products')
  } else {
    next()
  }
})

export default router
