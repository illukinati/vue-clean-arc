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
        let pack = this.pack
        if (!pack || pack.id !== packId) {
          pack = await getPackByIdUseCase.execute(packId)
          if (!pack) throw new Error('Pack not found')
        }

        const filteredCards = pack.cards.filter((card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        this.pack = { ...pack, cards: filteredCards }
      } catch (err: any) {
        this.setError(err.message ?? 'Unknown error')
      } finally {
        this.loading = false
      }
    },
  },
})
