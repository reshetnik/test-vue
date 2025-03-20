import { ref, watchEffect, type Ref } from 'vue'

export function useQuery<T = unknown>(query: Ref<string>) {
  const data = ref<T | null>(null)
  const loading = ref<boolean>(true)

  watchEffect(async () => {
    loading.value = true

    try {
      const response = await fetch(query.value)

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      data.value = (await response.json()) as T
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })

  return { data, loading }
}
