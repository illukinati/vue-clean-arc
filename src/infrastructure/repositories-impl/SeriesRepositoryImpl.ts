import { axiosInstance } from '@/infrastructure/config/api-config'
import type { SeriesRepository } from '@/domain/repositories/SeriesRepository'
import type { Series } from '@/domain/entities/Series'

export class SeriesRepositoryImpl implements SeriesRepository {
  async getAllSeries(): Promise<Series[]> {
    try {
      const response = await axiosInstance.get('/series/tcgp')
      return response.data
    } catch (error) {
      console.error('Error fetching series:', error)
      throw new Error('Failed to fetch series')
    }
  }
}
