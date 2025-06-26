import { defineStore } from 'pinia'
import type { Pack } from '@/domain/entities/Pack'
import { PackRepositoryImpl } from '@/infrastructure/repositories-impl/PackRepositoryImpl'
import { GetPackByIdUseCase, SearchCardsInPackUseCase } from '@/application/use-cases/PackUseCases'

const repo = new PackRepositoryImpl()
const getPackByIdUseCase = new GetPackByIdUseCase(repo)
const searchCardsInPackUseCase = new SearchCardsInPackUseCase(repo)

export const usePackStore = defineStore('pack', {
  state: () => ({
    pack: null as Pack | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value
      if (value) this.error = null
    },
    setError(message: string | null) {
      this.error = message
      this.loading = false
    },

    async fetchPackById(id: string) {
      this.setLoading(true)
      try {
        this.pack = await getPackByIdUseCase.execute(id)
      } catch (err: any) {
        this.setError(err.message ?? 'Unknown error')
      } finally {
        this.loading = false
      }
    },

    async searchCardsInPack(packId: string, searchTerm: string) {
      this.setLoading(true)
      try {
        this.pack = await searchCardsInPackUseCase.execute(packId, searchTerm)
      } catch (err: any) {
        this.error = err.message ?? 'Unknown error'
      } finally {
        this.loading = false
      }
    },
  },
})
