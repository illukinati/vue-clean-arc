import { defineStore } from 'pinia'
import type { Pack } from '@/domain/entities/Pack'
import { PackRepositoryImpl } from '@/infrastructure/repositories-impl/PackRepositoryImpl'
import { GetPackByIdUseCase } from '@/application/use-cases/PackUseCases'

const repo = new PackRepositoryImpl()
const getPackByIdUseCase = new GetPackByIdUseCase(repo)

export const usePackStore = defineStore('pack', {
  state: () => ({
    pack: null as Pack | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchPackById(id: string) {
      this.loading = true
      this.error = null
      try {
        this.pack = await getPackByIdUseCase.execute(id)
      } catch (err: any) {
        this.error = err.message ?? 'Unknown error'
      } finally {
        this.loading = false
      }
    },

    async searchCardsInPack(packId: string, searchTerm: string) {
      this.loading = true
      this.error = null
      try {
        const pack = await getPackByIdUseCase.execute(packId)
        if (!pack) {
          throw new Error('Pack not found')
        }

        // Filter cards based on the search term
        const filteredCards = pack.cards.filter((card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        this.pack = { ...pack, cards: filteredCards }
      } catch (err: any) {
        this.error = err.message ?? 'Unknown error'
      } finally {
        this.loading = false
      }
    },
  },
})
