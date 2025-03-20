export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T
  label: string
  customRender?: (value: T[keyof T]) => string | number
}

export interface TableConfig<T = Record<string, unknown>> {
  columns: TableColumn<T>[]
  data: T[]
}

export type VTableEmits = {
  (e: 'rowClick', row: unknown): void
}
