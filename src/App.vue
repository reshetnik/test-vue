<script setup lang="ts">
import { NNotificationProvider } from 'naive-ui'
import { RouterView } from 'vue-router'
</script>

<template>
  <NNotificationProvider>
    <main class="flex flex-col"><RouterView /></main>
  </NNotificationProvider>
</template>
