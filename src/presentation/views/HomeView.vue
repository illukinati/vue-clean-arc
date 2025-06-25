<script setup lang="ts">
import { useSeriesStore } from '@/application/stores/SeriesStore'
import { onMounted } from 'vue'

const seriesStore = useSeriesStore()

onMounted(() => {
  seriesStore.fetchSeries()
})
</script>

<template>
  <div class="min-h-screen" v-if="seriesStore.loading">Loading...</div>
  <div class="min-h-screen" v-if="seriesStore.error">{{ seriesStore.error }}</div>

  <section class="mx-auto">
    <ul v-if="seriesStore.series" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <li v-for="set in seriesStore.series.sets" :key="set.id">
        <RouterLink :to="`/pack/${set.id}`">
          <img
            v-if="set.logo"
            :src="set.logo + '.png'"
            alt="Series Logo"
            class="w-24 h-24 mx-auto object-contain mb-2 cursor-pointer"
          />
          <h1 v-else class="text-center text-lg font-bold">
            {{ set.name }}
          </h1>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
