<script setup lang="ts">
import { computed } from 'vue'

import { useServePagination } from './hooks/useServePagination'
import { getTotalPages } from './utils/getTotalPages'

import { DOTS, PAGINATION_LIMIT } from './constants'
import { NButton } from 'naive-ui'
import { ArrowLeft20Filled, ArrowRight20Filled } from '@vicons/fluent'

type PaginationProps = {
  currentPage: number
  total: number
}

type PaginationEmits = {
  (e: 'onChangePage', page: number): void
}

const props = defineProps<PaginationProps>()
const emit = defineEmits<PaginationEmits>()

const paginationItems = useServePagination({
  totalCount: props.total,
  pageSize: PAGINATION_LIMIT,
  siblingCount: 1,
  currentPage: props.currentPage,
})

const handleClickLeftArrow = () => {
  if (props.currentPage > 1) {
    emit('onChangePage', props.currentPage - 1)
  }
}

const totalPages = computed(() => getTotalPages(props.total))
const showPagination = computed(() => totalPages.value > 1)

const handleClickRightArrow = () => {
  if (props.currentPage < totalPages.value) {
    emit('onChangePage', props.currentPage + 1)
  }
}
</script>

<template>
  <div
    v-if="showPagination"
    className="pagination-container flex items-center gap-1 w-full justify-end pt-4"
  >
    <NButton @click="handleClickLeftArrow" :focusable="false">
      <template #icon>
        <ArrowLeft20Filled />
      </template>
    </NButton>
    <div v-for="page in paginationItems" :key="page">
      <div v-if="page === DOTS" class="w-8 h-8 flex place-content-center">
        {{ DOTS }}
      </div>
      <NButton
        v-else
        :key="page"
        class="w-fit min-w-10 max-w-10"
        :color="page === props.currentPage ? '#2c3e50' : ''"
        @click="emit('onChangePage', Number(page))"
        :focusable="false"
      >
        {{ String(page) }}
      </NButton>
    </div>

    <NButton icon="chevron_right" @click="handleClickRightArrow" :focusable="false">
      <template #icon>
        <ArrowRight20Filled />
      </template>
    </NButton>
  </div>
</template>
