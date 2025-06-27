import { describe, it, expect, vi } from 'vitest'
import { GetCardByIdUseCase } from '@/application/use-cases/CardUseCases'
import type { Card } from '@/domain/entities/Card'
import type { CardRepository } from '@/domain/repositories/CardRepository'

describe('GetCardByIdUseCase', () => {
  it('should return card when repository succeeds', async () => {
    const fakeCard: Card = {
      id: '1',
      name: 'Test Card',
      category: '',
      illustrator: '',
      image: '',
      localId: '',
      rarity: '',
      hp: 0,
      types: [],
      description: '',
      stage: '',
      attacks: [],
      weaknesses: [],
      retreat: 0,
      boosters: [],
      updated: '',
    }

    const mockRepo: CardRepository = {
      getCardById: vi.fn().mockResolvedValue(fakeCard),
    }

    const useCase = new GetCardByIdUseCase(mockRepo)

    const result = await useCase.execute('1')

    expect(mockRepo.getCardById).toHaveBeenCalledWith('1')
    expect(result).toEqual(fakeCard)
  })

  it('should throw error when repository throws', async () => {
    const mockRepo: CardRepository = {
      getCardById: vi.fn().mockRejectedValue(new Error('DB error')),
    }

    const useCase = new GetCardByIdUseCase(mockRepo)

    await expect(useCase.execute('999')).rejects.toThrow('Failed to fetch card by ID')
    expect(mockRepo.getCardById).toHaveBeenCalledWith('999')
  })
})
