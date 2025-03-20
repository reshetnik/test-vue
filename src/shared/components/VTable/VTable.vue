<script setup lang="ts">
import type { TableConfig, VTableEmits } from './types'

const props = defineProps<TableConfig<Record<string, unknown>>>()
const emit = defineEmits<VTableEmits>()
</script>

<template>
  <div>
    <table class="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.key"
            class="px-4 py-2 border-b border-gray-300 text-left font-semibold bg-gray-100"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in props.data" :key="rowIndex">
          <td
            v-for="column in props.columns"
            :key="column.key"
            class="px-4 py-2 border-b border-gray-200"
            @click="emit('rowClick', row)"
          >
            {{ column.customRender ? column.customRender(row[column.key]) : row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
