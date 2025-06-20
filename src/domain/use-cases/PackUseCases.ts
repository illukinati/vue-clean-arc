import type { Pack } from '../entities/Pack'
import type { PackRepository } from '../repositories/PackRepository'

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

/**
 * Use case for retrieving packs by a specific series ID.
 * This class interacts with the PackRepository to fetch all packs that belong to a given series,
 * handling any errors that may occur during the retrieval process.
 */
export class GetPackBySeriesUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(seriesId: string): Promise<Pack[]> {
    try {
      const packs = await this.packRepository.getPacksBySeries(seriesId)
      return packs
    } catch (error) {
      console.error('Error fetching packs by series:', error)
      throw new Error('Failed to fetch packs by series')
    }
  }
}

/**
 * Use case for searching packs based on a query string.
 * This class interacts with the PackRepository to retrieve packs
 * that match the given search criteria,
 * and handles any errors that may occur during the search process.
 */
export class SearchPacksUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(query: string): Promise<Pack[]> {
    try {
      const packs = await this.packRepository.searchPacks(query)
      return packs
    } catch (error) {
      console.error('Error searching packs:', error)
      throw new Error('Failed to search packs')
    }
  }
}

/**
 * Use case for retrieving all packs from the repository.
 * Handles fetching the complete list of packs and manages
 * errors that may occur during the process.
 */
export class GetAllPacksUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(): Promise<Pack[]> {
    try {
      const packs = await this.packRepository.getAllPacks()
      return packs
    } catch (error) {
      console.error('Error fetching all packs:', error)
      throw new Error('Failed to fetch all packs')
    }
  }
}
