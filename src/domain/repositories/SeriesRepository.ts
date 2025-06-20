import type { Series } from '../entities/Series'

export interface SeriesRepository {
  getAllSeries(): Promise<Series[]>
}
