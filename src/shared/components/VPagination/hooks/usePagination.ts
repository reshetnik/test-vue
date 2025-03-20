import { computed, ref } from 'vue'
import { PAGINATION_LIMIT } from '../constants'

export const usePagination = () => {
  const page = ref(1)

  const changePage = (newPage: number) => {
    page.value = newPage
  }

  const offset = computed(() => {
    return (page.value - 1) * PAGINATION_LIMIT
  })

  return {
    page,
    offset,
    changePage,
  }
}
