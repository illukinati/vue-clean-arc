import type { Pack } from '../entities/Pack'

export interface PackRepository {
  getPackById(id: string): Promise<Pack | null>
}
