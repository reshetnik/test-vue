import { PAGINATION_LIMIT } from '../constants'

export const getTotalPages = (totalItems: number) => {
  return Math.ceil(totalItems / PAGINATION_LIMIT)
}
