import { defineStore } from 'pinia'
import type { Card } from '@/domain/entities/Card'
import { CardRepositoryImpl } from '@/infrastructure/repositories-impl/CardRepositoyImpl'
import { GetCardByIdUseCase } from '@/application/use-cases/CardUseCases'

const repo = new CardRepositoryImpl()
const getCardByIdUseCase = new GetCardByIdUseCase(repo)

export const useCardStore = defineStore('card', {
  state: () => ({
    card: null as Card | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCardById(id: string) {
      this.card = null
      this.loading = true
      this.error = null
      try {
        this.card = await getCardByIdUseCase.execute(id)
      } catch (err: any) {
        this.error = err.message ?? 'Unknown error'
      } finally {
        this.loading = false
      }
    },
  },
})
