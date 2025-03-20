import { computed, ref, watchEffect, type Ref } from 'vue'
import { useQuery } from './useQuery'
import { PAGINATION_LIMIT } from '@/shared/components/VPagination/constants'
import { useProductStore } from '@/stores/productStore'

const PRODUCTS_URL = 'https://dummyjson.com/products'

type ProductRaw = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[] // any, because of the API dummyjson.com is not typed
  total: number
  skip: number
  limit: number
}

export type Product = {
  id: number
  name: string
  description: string
  price: number
}

type UseGetProductsResult = {
  products: Ref<Product[]>
  loading: Ref<boolean>
  total: Ref<number>
  changePage: (pageNumber: number) => void
  currentPage: Ref<number, number>
  searchValue: Ref<string, string>
  doSearch: (search: string) => void
}

export const useGetProducts = (): UseGetProductsResult => {
  const skip = ref(0)
  const currentPage = ref(1)
  const searchString = ref('')
  const searchValue = ref('')

  const queryString = computed(() => {
    return `${PRODUCTS_URL}/search?q=${searchString.value}&limit=10&skip=${skip.value}`
  })

  const { data, loading } = useQuery<ProductRaw>(queryString)

  const rawData = computed(() => {
    if (data && data.value) {
      return {
        products: data.value.products.map((item) => ({
          id: item.id,
          name: item.title,
          description: item.description,
          price: item.price,
        })) as Product[],
        total: data.value.total,
      }
    }

    return null
  })

  const products = computed(() => {
    return rawData.value ? rawData.value.products : []
  })

  const productStore = useProductStore()

  watchEffect(() => {
    productStore.addProduct(products.value)
  })

  const total = computed(() => {
    return rawData.value ? rawData.value.total : 0
  })

  const changePage = (pageNumber: number) => {
    skip.value = pageNumber * PAGINATION_LIMIT - PAGINATION_LIMIT
    currentPage.value = pageNumber
  }

  const doSearch = (search: string) => {
    changePage(1)
    searchString.value = search
  }

  return {
    products,
    total,
    loading,
    changePage,
    currentPage,
    searchValue,
    doSearch,
  }
}
