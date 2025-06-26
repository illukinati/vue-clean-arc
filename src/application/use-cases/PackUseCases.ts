import type { Pack } from '../../domain/entities/Pack'
import type { PackRepository } from '../../domain/repositories/PackRepository'

/**
 * Use case for retrieving a pack by its unique identifier.
 * This class encapsulates the logic to fetch a pack from
 * the repository and handles errors that may occur during the process.
 */
export class GetPackByIdUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(id: string): Promise<Pack | null> {
    try {
      const pack = await this.packRepository.getPackById(id)
      return pack
    } catch (error) {
      console.error('Error fetching pack by ID:', error)
      throw new Error('Failed to fetch pack by ID')
    }
  }
}

export class SearchCardsInPackUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(packId: string, searchTerm: string): Promise<Pack | null> {
    try {
      const pack = await this.packRepository.getPackById(packId)
      if (!pack) {
        throw new Error('Pack not found')
      }

      const filteredCards = pack.cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      return { ...pack, cards: filteredCards }
    } catch (error) {
      console.error('Error searching cards in pack:', error)
      throw new Error('Failed to search cards in pack')
    }
  }
}
