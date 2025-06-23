import { axiosInstance } from '@/infrastructure/config/api-config'
import type { CardRepository } from '@/domain/repositories/CardRepository'
import type { Card } from '@/domain/entities/Card'

export class CardRepositoryImpl implements CardRepository {
  async getCardById(id: string): Promise<Card | null> {
    try {
      const response = await axiosInstance.get(`/cards/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching card by ID:', error)
      throw new Error('Failed to fetch card by ID')
    }
  }

  async getCardsBySet(setId: string): Promise<Card[]> {
    try {
      const response = await axiosInstance.get(`/cards/set/${setId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching cards by set:', error)
      throw new Error('Failed to fetch cards by set')
    }
  }

  async searchCards(query: string): Promise<Card[]> {
    try {
      const response = await axiosInstance.get('/cards/search', { params: { q: query } })
      return response.data
    } catch (error) {
      console.error('Error searching cards:', error)
      throw new Error('Failed to search cards')
    }
  }
}
