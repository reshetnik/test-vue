import { createRouter, createWebHistory } from 'vue-router'
import ProductListPage from '@/pages/ProductListPage.vue'
import ProductDetailPage from '@/pages/ProductDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
    {
      path: '/',
      name: 'productList',
      component: ProductListPage,
    },
    {
      path: '/product/:id',
      name: 'productDetails',
      component: ProductDetailPage,
    },
  ],
})

export default router
