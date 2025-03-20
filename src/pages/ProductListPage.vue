<script setup lang="ts">
import VPagination from '@/shared/components/VPagination/VPagination.vue'
import VSpinner from '@/shared/components/VSpinner/VSpinner.vue'
import type { TableColumn } from '@/shared/components/VTable/types'
import VTable from '@/shared/components/VTable/VTable.vue'
import { useGetProducts, type Product } from '@/shared/hooks/useGetProducts'
import { formatPrice } from '@/shared/utils/formattedPrice'
import { debounce } from 'lodash'
import { NInput } from 'naive-ui'
import { useRouter } from 'vue-router'

const CONFIG: TableColumn[] = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'price',
    label: 'Price',
    customRender: (value) => formatPrice(Number(value)),
  },
]

const router = useRouter()

const { products, total, loading, changePage, currentPage, doSearch, searchValue } =
  useGetProducts()

const debounceSearch = debounce((search: string) => {
  searchValue.value = search
  doSearch(search)
}, 500)

const onRowClick = (row: unknown) => {
  const typedRow = row as Product

  router.push({
    path: `product/${typedRow.id}`,
  })
}
</script>

<template>
  <div class="text-2xl mb-5">Products</div>
  <section class="flex flex-col gap-3">
    <div class="search max-w-[300px]">
      <NInput
        placeholder="Search"
        :value="searchValue"
        @input="
          (str) => {
            searchValue = str
          }
        "
        @update:value="debounceSearch"
      />
    </div>
    <div class="flex items-center justify-center" v-if="loading">
      <VSpinner />
    </div>
    <div v-else>
      <div class="list">
        <VTable :columns="CONFIG" :data="products" @rowClick="onRowClick" />
      </div>
      <div class="pagination">
        <VPagination :currentPage="currentPage" :total="total" @onChangePage="changePage" />
      </div>
      <div>Total Products: {{ total }}</div>
    </div>
  </section>
</template>
