<script setup lang="ts">
import type { Product } from '@/shared/hooks/useGetProducts'
import { useProductStore } from '@/stores/productStore'
import { ArrowLeft20Filled } from '@vicons/fluent'
import { NButton, useNotification } from 'naive-ui'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const id = route.params.id

const productStore = useProductStore()

const product = ref<Product | null>(null)

const notification = useNotification()

watchEffect(() => {
  const selectedProduct =
    productStore.selectedProduct.find((item) => item.id === Number(id)) || null

  if (selectedProduct) {
    product.value = selectedProduct
  } else {
    notification.error({
      content: 'Product not found',
    })

    router.push('/')
  }
})
</script>

<template>
  <div class="mb-5">
    <NButton @click="router.push('/')" size="small" round>
      <template #icon>
        <ArrowLeft20Filled />
      </template>
      go back
    </NButton>
  </div>

  <div class="text-2xl mb-5">Product Details:</div>
  <section class="grid grid-cols-2 gap-1 border border-gray-300 rounded p-4">
    <div class="font-bold">Name:</div>
    <div>{{ product?.name }}</div>
    <div class="font-bold">Description:</div>
    <div>{{ product?.description }}</div>
    <div class="font-bold">Price:</div>
    <div>{{ product?.price }}</div>
  </section>
</template>
