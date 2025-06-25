import type { Series } from '../../domain/entities/Series'
import type { SeriesRepository } from '../../domain/repositories/SeriesRepository'

/** Use case class responsible for retrieving all series from the repository.
 * It encapsulates the logic for fetching series and handles
 * any errors that may occur during the process.
 */
export class GetAllSeriesUseCase {
  constructor(private seriesRepository: SeriesRepository) {}

  async execute(): Promise<Series> {
    try {
      const series = await this.seriesRepository.getAllSeries()
      return series
    } catch (error) {
      console.error('Error fetching series:', error)
      throw new Error('Failed to fetch series')
    }
  }
}
