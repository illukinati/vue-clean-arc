import type { Card } from '../../domain/entities/Card'
import type { CardRepository } from '../../domain/repositories/CardRepository'

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
