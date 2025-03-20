import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/shared/hooks/useGetProducts'

export const useProductStore = defineStore('useProductStore', () => {
  const selectedProduct = ref<Product[]>([])

  const addProduct = (product: Product[]) => {
    selectedProduct.value = product
  }

  const removeProduct = () => {
    selectedProduct.value = []
  }

  return { selectedProduct, addProduct, removeProduct }
})
