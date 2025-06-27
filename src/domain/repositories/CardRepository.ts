import type { Card } from '../entities/Card'

export interface CardRepository {
  getCardById(id: string): Promise<Card | null>
}
