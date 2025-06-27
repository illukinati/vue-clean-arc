import { defineStore } from 'pinia'
import type { Series } from '@/domain/entities/Series'
import { SeriesRepositoryImpl } from '@/infrastructure/repositories-impl/SeriesRepositoryImpl'
import { GetAllSeriesUseCase } from '@/application/use-cases/SeriesUseCases'

const repo = new SeriesRepositoryImpl()
const getAllSeriesUseCase = new GetAllSeriesUseCase(repo)

export const useSeriesStore = defineStore('series', {
  state: () => ({
    series: null as Series | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchSeries() {
      this.loading = true
      this.error = null
      try {
        this.series = await getAllSeriesUseCase.execute()
      } catch (err: any) {
        this.error = err.message ?? 'Unknown error'
      } finally {
        this.loading = false
      }
    },
  },
})
