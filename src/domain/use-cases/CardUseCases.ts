import type { Card } from '../entities/Card'
import type { CardRepository } from '../repositories/CardRepository'

export class GetCardByIdUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute(id: string): Promise<Card | null> {
    try {
      const card = await this.cardRepository.getCardById(id)
      return card
    } catch (error) {
      console.error('Error fetching card by ID:', error)
      throw new Error('Failed to fetch card by ID')
    }
  }
}

export class GetCardsBySetUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute(setId: string): Promise<Card[]> {
    try {
      const cards = await this.cardRepository.getCardsBySet(setId)
      return cards
    } catch (error) {
      console.error('Error fetching cards by set:', error)
      throw new Error('Failed to fetch cards by set')
    }
  }
}

export class SearchCardsUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute(query: string): Promise<Card[]> {
    try {
      const cards = await this.cardRepository.searchCards(query)
      return cards
    } catch (error) {
      console.error('Error searching cards:', error)
      throw new Error('Failed to search cards')
    }
  }
}
