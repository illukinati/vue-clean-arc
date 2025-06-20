import type { Pack } from '../entities/Pack'

export interface PackRepository {
  getPackById(id: string): Promise<Pack | null>
  getPacksBySeries(seriesId: string): Promise<Pack[]>
  searchPacks(query: string): Promise<Pack[]>
  getAllPacks(): Promise<Pack[]>
}
