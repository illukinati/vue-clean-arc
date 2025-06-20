import type { Card } from '../entities/Card'

export interface CardRepository {
  getCardById(id: string): Promise<Card | null>
  getCardsBySet(setId: string): Promise<Card[]>
  searchCards(query: string): Promise<Card[]>
}
